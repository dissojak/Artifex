const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Artwork = require("../models/artwork");
const mongoose = require("mongoose");
const { getArtistById } = require("../controller/ArtistController");
const { calculateScore } = require("./AnalyticsController");
const axios = require("axios");

/**
 * @desc    Add new artwork 
 * @route   POST /api/artwork/addArtwork
 * @params  title,description,price,imageArtwork,id_category
 * @access  Private
 * @optionel_Params exclusive ( only when its true);
 */
exports.addArtwork = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const io = req.app.io;
  const socketIds = req.app.socketIds;
  const artistId = req.user._id;
  console.log("artist id is : ", artistId);
  const { title, description, price, imageArtwork, id_category, exclusive } =
    req.body;

  // Create new artwork instance
  const newArtwork = new Artwork({
    title,
    description,
    price,
    imageArtwork,
    id_category,
    id_artist: artistId,
    exclusive: exclusive || false,
  });
  let artwork;
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    // artwork = await newArtwork.save({ session });
    artwork = await newArtwork.save();
  } catch (e) {
    return next(new HttpError("artwork not saved , error hapnned :", e, 500));
  }
  const artist = await getArtistById(artistId);

  followers.forEach(async (follower) => {
    const clientSocketEntry = socketIds.find(
      (entry) => entry.userId.toString() === follower.clientId.toString()
    );

    if (clientSocketEntry) {
      const clientSocketId = clientSocketEntry.socketId;
      io.to(clientSocketId).emit("newArtwork", {
        msg: "A new artwork has been added by an artist you follow",
        artwork,
        artist,
      });
      console.log({
        msg: "A new artwork has been added by an artist you follow",
        artwork,
        artist,
      });

      // Optionally, save a notification for this event
      const notification = new ArtworkNotification({
        recipientId: follower.clientId,
        senderId: artistId,
        action: "create",
        artworkId: artwork._id,
      });
      try {
        // await notification.save({ session });
        await notification.save();
      } catch (e) {
        return next(
          new HttpError(
            "artwork not saved cuz of notification saving process, error hapnned :",
            e,
            505
          )
        );
      }
    }
  });
  // await session.commitTransaction();
  // session.endSession();
  res.json({
    msg: "Artwork added successfully",
    artwork,
  });
});

/**
 * @desc    Get artworks from database
 * @route   GET /api/artwork/getArtworks
 * @access  Private
 */
exports.getArtworks = asyncHandler(async (req, res, next) => {
  try {
    const artworks = await Artwork.find({
      visibility: "public",
      exclusive: false,
      isDeletedByOwner: false,
      Sold: false,
      status: "approved",
    })
      .populate({
        path: "id_category", // Populate the 'id_category' field
        select: "name", // Select the 'name'
        // select: 'name -_id' // Select only the 'name' field and exclude the '_id' field
      })
      .populate({
        path: "id_artist",
        select: "username , profileImage",
      });

    if (!artworks || artworks.length === 0) {
      return next(new HttpError("Artworks not found", 404));
    }

    // Fetch scores for all artists
    const scores = await Promise.all(
      artworks.map(async (artwork) => ({
        artworkId: artwork._id,
        // check analytic controller for calculateScore
        score: await calculateScore(artwork.id_artist._id),
      }))
    );

    // Sort artworks based on the fetched scores
    artworks.sort((a, b) => {
      const scoreA = scores.find((score) =>
        score.artworkId.equals(a._id)
      ).score;
      const scoreB = scores.find((score) =>
        score.artworkId.equals(b._id)
      ).score;
      return scoreB - scoreA;
    });

    res.json({
      msg: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    next(new HttpError(error.message || "Failed to retrieve artwork", 500));
  }
});

/**
 * @desc    Get artworks from database
 * @route   GET /api/artwork/getArtworksForAdmin
 * @access  Private
 * @author  Admin
 */
exports.getArtworksForAdmin = asyncHandler(async (req, res, next) => {
  try {
    const artworks = await Artwork.find({
      isDeletedByOwner: false,
      status: "pending",
    })
      .populate({
        path: "id_category", // Populate the 'id_category' field
        select: "name", // Select the 'name'
        // select: 'name -_id' // Select only the 'name' field and exclude the '_id' field
      })
      .populate({
        path: "id_artist",
        select: "username , profileImage",
      });

    if (!artworks || artworks.length === 0) {
      return res.status(200).json({
        message: "No artworks found for this artist",
        artworks: [],
      });
    }

    res.status(200).json({
      message: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    next(new HttpError("Failed to retrieve artworks", 500));
  }
});

/**
 * @desc    Approve an artwork
 * @route   PUT /api/artwork/approveArtwork
 * @params  artworkId
 * @access  Private
 * @author  Admin
 */
exports.approveArtwork = asyncHandler(async (req, res, next) => {
  const { artworkId, authorisation } = req.body;

  if (!authorisation) {
    return next(new HttpError("UNAUTHORIZED !", 401));
  }

  try {
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    artwork.status = "approved";
    await artwork.save();

    res.status(200).json({
      message: "Artwork approved successfully",
      artwork,
    });
  } catch (error) {
    next(new HttpError("Failed to approve artwork", 500));
  }
});

/**
 * @desc    Decline an artwork
 * @route   PUT /api/artwork/declineArtwork
 * @params  artworkId
 * @access  Private
 * @author  Admin
 */
exports.declineArtwork = asyncHandler(async (req, res, next) => {
  const { artworkId } = req.body;

  try {
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    artwork.status = "declined";
    await artwork.save();

    res.status(200).json({
      message: "Artwork declined successfully",
      artwork,
    });
  } catch (error) {
    next(new HttpError("Failed to decline artwork", 500));
  }
});

/**
 * @desc    Get Exclusive Artworks from database
 * @route   GET /api/artwork/getExclusiveArtworks
 * @access  Private
 * @author  Admin
 */
exports.getExclusiveArtworks = asyncHandler(async (req, res, next) => {
  try {
    const artworks = await Artwork.find({ exclusive: true })
      .populate({
        path: "id_category", // Populate the 'id_category' field
        select: "name", // Select the 'name'
        // select: 'name -_id' // Select only the 'name' field and exclude the '_id' field
      })
      .populate({
        path: "id_artist",
        select: "username , profileImage",
      });

    if (!artworks || artworks.length === 0) {
      return next(new HttpError("Artworks not found", 404));
    }

    res.json({
      msg: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    next(new HttpError(error.message || "Failed to retrieve artwork", 500));
  }
});

/**
 * @desc    Approve all artworks
 * @route   PUT /api/artwork/approveAll
 * @access  Private
 * @author  SupperAdmin
 */
// approveAllArtworks();
async function approveAllArtworks() {
  try {
    const result = await Artwork.updateMany({}, { status: "approved" });
    console.log(
      `Successfully updated ${result.nModified} artworks to approved status.`
    );
  } catch (error) {
    console.error("Error updating artworks:", error);
  }
}

/**
 * @desc    Delete an artwork
 * @route   DELETE /api/artwork/deleteArtworkByAdmin/:artworkId
 * @params  artworkId
 * @access  Private
 * @author  Admin
 */
exports.deleteArtworkByAdmin = asyncHandler(async (req, res, next) => {
  const artworkId = req.params.artworkId;

  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    await artwork.deleteOne();

    res.status(202).json({ msg: "Artwork deleted successfully" });
  } catch (error) {
    next(new HttpError(`${error.message},Failed to delete artwork`, 500));
  }
});

/**
 * @desc    Delete an artwork
 * @route   DELETE /api/artwork/deleteArtwork/:artworkId
 * @params  artworkId
 * @access  Private
 */
exports.deleteArtwork = asyncHandler(async (req, res, next) => {
  const artworkId = req.body.artworkId;

  try {
    let artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    // Check if the user is authorized to delete the artwork
    if (String(artwork.id_artist) !== String(req.user._id)) {
      return next(
        new HttpError("You are not authorized to delete this artwork", 403)
      );
    }
    // Find the artwork by its ID and update the deletion status
    artwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { isDeletedByOwner: true },
      { new: true }
    );

    res.status(204).json({
      msg: "Artwork deleted successfully",
      artwork,
    });
  } catch (error) {
    next(new HttpError(error.message || "Failed to delete artwork", 500));
  }
});

/**
 * @desc    Edit an existing artwork
 * @route   PUT /api/artwork/editArtwork/:artworkId
 * @params  title, description, price, imageArtwork, id_category
 * @access  Private
 */
exports.editArtwork = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const artistId = req.user._id;
  const artworkId = req.params.artworkId;
  const { title, description, price, imageArtwork, id_category } = req.body;

  try {
    let artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return next(new HttpError("Artwork not found", 404));
    }

    // Check if the user is authorized to edit the artwork
    if (String(artwork.id_artist) !== String(artistId)) {
      return next(
        new HttpError("You are not authorized to edit this artwork", 403)
      );
    }

    artwork.title = title || artwork.title;
    artwork.description = description || artwork.description;
    artwork.price = price || artwork.price;
    artwork.imageArtwork = imageArtwork || artwork.imageArtwork;
    artwork.id_category = id_category || artwork.id_category;

    artwork = await artwork.save();

    res.json({
      msg: "Artwork updated successfully",
      artwork,
    });
  } catch (error) {
    next(new HttpError(error.message || "Failed to update artwork", 500));
  }
});

/**
 * @desc    change visibility of artwork from public to private
 * @route   PUT /api/artwork/private
 * @params  artworkId
 * @access  Private
 */
exports.makePrivate = asyncHandler(async (req, res, next) => {
  const { artworkId } = req.body;

  const artwork = await Artwork.findById(artworkId);

  if (!artwork) {
    return next(new HttpError("Artwork not found", 404));
  }

  if (artwork.id_artist.toString() !== req.user._id.toString()) {
    return next(
      new HttpError("You are not authorized to modify this artwork", 401)
    );
  }

  artwork.visibility = "private";
  try {
    await artwork.save();
  } catch (e) {
    return next(new HttpError("Failed to update artwork visibility", 500));
  }

  res.status(200).json({
    message: "Artwork is private now !",
    artwork,
  });
});

/**
 * @desc    change visibility of artwork from private to public
 * @route   PUT /api/artwork/public
 * @params  artworkId
 * @access  Private
 */
exports.makePublic = asyncHandler(async (req, res, next) => {
  const { artworkId } = req.body;

  const artwork = await Artwork.findById(artworkId);

  if (!artwork) {
    return next(new HttpError("Artwork not found", 404));
  }

  if (artwork.id_artist.toString() !== req.user._id.toString()) {
    return next(
      new HttpError("You are not authorized to modify this artwork", 401)
    );
  }

  artwork.visibility = "public";
  try {
    await artwork.save();
  } catch (e) {
    return next(new HttpError("Failed to update artwork visibility", 500));
  }

  res.status(200).json({
    message: "Artwork is public now !",
    artwork,
  });
});

/**
 * @desc    Check visibility of artwork
 * @route   GET /api/artwork/visibility/:artworkId
 * @params  artworkId
 * @access  Private
 */
exports.checkVisibility = asyncHandler(async (req, res, next) => {
  const { artworkId } = req.params;

  const artwork = await Artwork.findById(artworkId);

  if (!artwork) {
    return next(new HttpError("Artwork not found", 404));
  }

  res.status(200).json({
    message: "Artwork visibility retrieved successfully",
    visibility: artwork.visibility,
  });
});

/**
 * @desc    get artworks for artist profile
 * @route   GET /api/artwork/getArtworksByArtistId
 * @params  artistId ( for not artist itself )
 * @access  Private
 */
exports.getArtworksByArtistId = asyncHandler(async (req, res, next) => {
  const artistId = req.body.artistId || req.user._id;
  const artist = req.body.artistId;
  const client = req.user._id;
  const inMuseum = req.body.inMuseum; // it's true or Undefined !
  try {
    let artworks;
    if (artist == client && !inMuseum) {
      artworks = await Artwork.find({
        id_artist: artistId,
        isDeletedByOwner: false,
        exclusive: false,
        Sold: false,
      });
    } else {
      artworks = await Artwork.find({
        id_artist: artistId,
        isDeletedByOwner: false,
        Sold: false,
        exclusive: false,
        visibility: "public",
        status: "approved",
      });
    }

    if (!artworks || artworks.length === 0) {
      return res.status(200).json({
        message: "No artworks found for this artist",
        artworks: [],
      });
    }

    res.status(200).json({
      message: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    next(new HttpError("Failed to retrieve artworks", 500));
  }
});

exports.getArtworksByCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.body.categoryId;

  try {
    const artworks = await Artwork.find({ id_category: categoryId });

    if (!artworks || artworks.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found for this category" });
    }

    res.status(200).json({
      message: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    next(new HttpError("Failed to retrieve artworks", 500));
  }
});

/**
 * @desc    Add new artwork
 * @route   POST /api/artwork/signup/addArtwork
 * @params  title,description,price,imageArtwork,id_category
 * @access  Private
 */
exports.addArtworkSignup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const artistId = req.user._id;
  const { title, description, price, imageArtwork, id_category } = req.body;

  // Create new artwork instance
  const newArtwork = new Artwork({
    title,
    description,
    price,
    imageArtwork,
    id_category,
    id_artist: artistId,
    exclusive: false,
  });
  let artwork;
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    // artwork = await newArtwork.save({ session });
    artwork = await newArtwork.save();
  } catch (e) {
    return next(new HttpError("artwork not saved !", 500));
  }
  res.json({
    msg: "Artwork added successfully",
    artwork,
  });
});

exports.getBoughtArtwork = async (req, res) => {
  const userId = req.user._id;

  try {
    const boughtArtworks = await Artwork.find({ Sold: true, Buyer: userId });

    if (!boughtArtworks || boughtArtworks.length === 0) {
      return res.status(200).json({
        message: "You have not buy any artworks yet ",
        artworks: [],
      });
    }

    res.json({
      message: "Retrieved bought artworks successfully.",
      artworks: boughtArtworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve artworks.",
      error: error.message || error,
    });
  }
};

exports.artworkPayment = async (req, res) => {
  const artworkId = req.body.artworkId;

  const url = "https://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "d01440af-5a3b-4c9f-8567-6c0f964d1ef7",
    app_secret: "dd3163a3-a4ad-4ec5-8875-e5658b3ef0ff",
    amount: req.body.amount,
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: "http://localhost:3000/artwork/success",
    fail_link: "http://localhost:3000/artwork/fail",
    developer_tracking_id: "a702c74a-9a4d-4f36-b18d-b76f63b7bef8",
  };

  const response = await axios.post(url, payload);

  if (response.data && response.data.result && response.data.result.success) {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).send({ msg: "Artwork not found", faild: "vide" });
    }
    if (artwork.Sold) {
      return res
        .status(400)
        .send({ msg: "Artwork already sold", faild: "sold" });
    }
    if (artwork) {
      return res.status(200).send({
        paymentInfo: response.data,
        artwork,
      });
    }
  }
};

exports.buyArtwork = async (req, res, next) => {
  const userId = req.user._id ||req.body.userId;
  // console.log(userId);

  const artworkId = req.body.artworkId;
  const paymentId = req.body.paymentId;
  const url = `https://developers.flouci.com/api/verify_payment/${paymentId}`;

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      apppublic: "d01440af-5a3b-4c9f-8567-6c0f964d1ef7",
      appsecret: "dd3163a3-a4ad-4ec5-8875-e5658b3ef0ff",
    },
  });

  if (response.data && response.data.result.status === "SUCCESS") {
    const artwork = await Artwork.findById(artworkId);

    artwork.Buyer = userId;
    artwork.Sold = true;
    await artwork.save();

    res.send({
      artwork,
      success: true,
      paymentVerif: response.data,
    });
  } else {
    res.status(400).send({
      message: "Payment verification failed",
      success: false,
      paymentVerif: response.data,
    });
  }
};

/**
 * @desc    Get an artwork by ID
 * @route   GET /api/artwork/getArtwork/:artworkId
 * @access  Private
 */
exports.getArtwork = asyncHandler(async (req, res, next) => {
  const { artworkId } = req.params;
  // console.log(artworkId);
  try {
    const artwork = await Artwork.findById(artworkId)
      .populate({
        path: "id_category", // Populate the 'id_category' field
        select: "name", // Select the 'name'
        // select: 'name -_id' // Select only the 'name' field and exclude the '_id' field
      })
      .populate({
        path: "id_artist",
        select: "username , profileImage",
      });

    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }
    res.status(200).json({
      message: "Artwork retrieved successfully",
      artwork,
    });
  } catch (error) {
    next(new HttpError("Failed to retrieve the artwork", 500));
  }
});

const trimArtworkDescriptions = async () => {
  try {
    // Find all artworks
    const artworks = await Artwork.find();

    // Loop through each artwork and update the description
    for (const artwork of artworks) {
      if (artwork.description.length > 250) {
        artwork.description = artwork.description.slice(0, 250);
        await artwork.save();
      }
    }

    res.status(200).json({
      msg: "All artwork descriptions updated successfully",
    });
  } catch (error) {
    console.log("Failed to update artwork descriptions", 500);
  }
};

// trim description on all the artworks
// trimArtworkDescriptions();
