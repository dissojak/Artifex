const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Museum = require("../models/museum");
const Participant = require("../models/participant");
const Artwork = require("../models/artwork");
const mongoose = require("mongoose");
const MuseumArtwork = require("../models/museumArtwork");
const { isCategoryExist } = require("./CategoryController");
const axios = require("axios");

/**
 * @desc     Create a museum
 * @function createMuseum
 * @method   POST
 * @route    POST /api/museum/create
 * @params   title, description, numberMaxArtists, numberMaxClients,
 *           priceClient, priceArtist, dateStart fomat:"2024-04-03",
 *           dateEnd (ISO 8601), isExclusive, idCategory
 * @access   Private
 */
exports.createMuseum = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const {
    title,
    description,
    museumImage,
    numberMaxArtists,
    numberMaxClients,
    priceClient,
    priceArtist,
    dateStart,
    dateEnd,
    isExclusive,
    idCategory,
  } = req.body;

  if (await Museum.findOne({ title })) {
    return next(new HttpError("museum with this title already exist", 401));
  }

  if (!(await isCategoryExist(idCategory))) {
    return next(new HttpError("category not found", 404));
  }

  const museum = new Museum({
    title,
    description,
    museumImage,
    numberMaxArtists,
    numberMaxClients,
    priceClient,
    priceArtist,
    dateStart,
    dateEnd,
    isExclusive,
    idCategory,
  });
  try {
    await museum.save();
  } catch (error) {
    return next(new HttpError("Failed to create museum", 500));
  }
  res.status(201).json({
    message: "Museum created successfully",
    museum,
  });
});

exports.getMuseums = asyncHandler(async (req, res, next) => {
  const today = new Date();
  const museums = await Museum.find({ dateEnd: { $gt: today } }).populate(
    "idCategory"
  );

  if (!museums || museums.length === 0) {
    return next(new HttpError("No museums found", 404));
  }

  res.status(200).json({
    message: "Museums retrieved successfully",
    museums,
  });
});

exports.getParticipantArtists = asyncHandler(async (req, res, next) => {
  const museumId = req.params.museumId;
  // console.log(museumId);

  const participantArtists = await Participant.find({
    museumId,
    participantType: "artist",
  }).populate("participantId");

  if (!participantArtists) {
    return res.status(404).json({
      note: "vide",
      message: "No participant artists found for this museum",
    });
  }
  if (participantArtists.length === 0) {
    return res.status(206).json({
      participantArtists: [],
      message: "No participant artists found for this museum",
    });
  }

  res.status(200).json({
    message: "Participant artists retrieved successfully",
    participantArtists,
  });
});

exports.getParticipantClients = asyncHandler(async (req, res, next) => {
  const museumId = req.body.museumId;

  const participantArtists = await Participant.find({
    museumId,
    participantType: "client",
  }).populate("participantId");

  if (!participantArtists || participantArtists.length === 0) {
    return res.status(404).json({
      note: "vide",
      message: "No participant clients found for this museum",
    });
  }

  res.status(200).json({
    message: "Participant clients retrieved successfully",
    participantArtists,
  });
});

exports.museumPayment = async (req, res, next) => {
  const museumId = req.body.museumId;
  const participantId = req.user._id;

  const url = "https://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "d01440af-5a3b-4c9f-8567-6c0f964d1ef7",
    app_secret: "dd3163a3-a4ad-4ec5-8875-e5658b3ef0ff",
    amount: req.body.amount,
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: "http://localhost:3000/museum/success",
    fail_link: "http://localhost:3000/museum/fail",
    developer_tracking_id: "a702c74a-9a4d-4f36-b18d-b76f63b7bef8",
  };

  const response = await axios.post(url, payload);

  if (response.data && response.data.result && response.data.result.success) {
    const museum = await Museum.findById(museumId);
    if (!museum) {
      return res.status(404).send({ msg: "Artwork not found", faild: "vide" });
    }
    const existingParticipant = await Participant.findOne({
      museumId,
      participantId,
    });
    if (existingParticipant) {
      return next(
        new HttpError("You already have a pass for this museum", 400)
      );
    }
    if (museum && !existingParticipant) {
      return res.status(200).send({
        paymentInfo: response.data,
        museum,
      });
    }
  }
};

exports.buyArtistPass = async (req, res, next) => {
  const artistId = req.user._id;
  const museumId = req.body.museumId;
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
    const participant = new Participant({
      museumId,
      participantId: artistId,
      participantType: "artist",
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await participant.save({ session });
      await Museum.findByIdAndUpdate(
        museumId,
        { $inc: { artistsEntered: 1 } },
        { session }
      );
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      return next(new HttpError("Failed to join the museum as an artist", 500));
    }

    res.status(201).json({
      message: "You successfully joined the museum",
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

exports.buyClientPass = async (req, res, next) => {
  const clientId = req.user._id;
  const museumId = req.body.museumId;
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
    const participant = new Participant({
      museumId,
      participantId: clientId,
      participantType: "client",
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await participant.save({ session });
      await Museum.findByIdAndUpdate(
        museumId,
        { $inc: { clientsEntered: 1 } },
        { session }
      );
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      return next(new HttpError("Failed to join the museum as an clinet", 500));
    }
    res.status(201).json({
      message: "clinet successfully joined the museum",
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

//----------------------- PAYMENT REQUIRED --------------------------

exports.artistJoin = asyncHandler(async (req, res, next) => {
  //----------------------- THIS NEEED UPDATE --------------------------

  // get also the artworks ids to add them to the museumArtwork
  // and also to the museum list !
  const { museumId } = req.body;
  const artistId = req.user._id;

  const existingParticipant = await Participant.findOne({
    museumId,
    participantId: artistId,
  });

  if (existingParticipant) {
    return next(
      new HttpError("Artist is already a participant in this museum", 400)
    );
  }

  const participant = new Participant({
    museumId,
    participantId: artistId,
    participantType: "artist",
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await participant.save({ session });
    await Museum.findByIdAndUpdate(
      museumId,
      { $inc: { artistsEntered: 1 } },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    return next(new HttpError("Failed to join the museum as an artist", 500));
  }

  res.status(201).json({
    message: "Artist successfully joined the museum",
  });
});

//----------------------- PAYMENT REQUIRED --------------------------

exports.clientJoin = asyncHandler(async (req, res, next) => {
  const { museumId } = req.body;
  const clinetId = req.user._id;

  const existingParticipant = await Participant.findOne({
    museumId,
    participantId: clinetId,
  });

  if (existingParticipant) {
    return next(
      new HttpError("Artist is already a participant in this museum", 400)
    );
  }

  const participant = new Participant({
    museumId,
    participantId: clinetId,
    participantType: "client",
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await participant.save({ session });
    await Museum.findByIdAndUpdate(
      museumId,
      { $inc: { clientsEntered: 1 } },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    return next(new HttpError("Failed to join the museum as an clinet", 500));
  }

  res.status(201).json({
    message: "clinet successfully joined the museum",
  });
});

exports.editMuseum = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }
  const { museumId } = req.body;
  const { title, description, priceClient, priceArtist, dateStart, dateEnd } =
    req.body;

  let updatedMuseum;
  try {
    updatedMuseum = await Museum.findByIdAndUpdate(
      museumId,
      {
        title,
        description,
        priceClient,
        priceArtist,
        dateStart,
        dateEnd,
      },
      { new: true, runValidators: true } // return the updated version and run model validators
    );
    if (!updatedMuseum) {
      return next(new HttpError("Museum not found", 404));
    }
  } catch (error) {
    return next(new HttpError("Failed to update museum", 500));
  }
  res.status(200).json({
    message: "Museum updated successfully",
    museum: updatedMuseum,
  });
});

/**
 * @desc    Get museum by ID
 * @route   GET /api/museum/:id
 * @access  Public
 */
exports.getMuseumById = asyncHandler(async (req, res, next) => {
  const museumId = req.params.id;

  try {
    const museum = await Museum.findById(museumId).populate("idCategory");

    if (!museum) {
      return next(new HttpError("Museum not found", 404));
    }

    res.status(200).json({
      message: "Museum retrieved successfully",
      museum,
    });
  } catch (error) {
    return next(new HttpError("Failed to retrieve museum", 500));
  }
});

/**
 * @desc    Add new artwork and mark it as exclusive
 * @route   POST /api/museum/addExclusiveArtwork
 * @params  museumId,title,description,price,imageArtwork,id_category
 * @access  Private
 */
exports.addExclusiveArtwork = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const museumId = req.body.museumId;
  const artistId = req.user._id;
  const { title, description, price, imageArtwork, id_category } = req.body;

  // Check if museum exists
  const museumExists = await Museum.findById(museumId);
  if (!museumExists) {
    return next(new HttpError("Museum not found", 404));
  }

  // Since new artworks added through this route are always exclusive,
  // we set the exclusive property to true explicitly.
  const newArtwork = new Artwork({
    title,
    description,
    price,
    imageArtwork,
    id_category,
    id_artist: artistId,
    exclusive: true,
  });

  console.log(newArtwork);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // Try saving the new artwork
    try {
      await newArtwork.save({ session });
    } catch (error) {
      return next(new HttpError("Failed to save new artwork", 500));
    }

    // Try creating and saving museum artwork
    const museumArtwork = new MuseumArtwork({
      artworkId: newArtwork._id,
      museumId,
      exclusive: true,
    });
    museumExists.artworkIds.push(newArtwork._id);

    try {
      await museumExists.save({ session });
      await museumArtwork.save({ session });
    } catch (error) {
      return next(new HttpError("Failed to save museum artwork", 500));
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    return next(new HttpError("Failed to add artwork to museum", 500));
  }

  res.status(201).json({
    message: "New exclusive artwork added to museum successfully",
    artwork: newArtwork,
  });
});

/**
 * @desc    Add multiple existing artworks to a museum
 * @route   POST /api/museum/addArtworks
 * @params  artworkIds,museumId
 * @access  Private
 */
exports.addArtworksToMuseum = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const { museumId, artworkIds } = req.body;
  const artistId = req.user._id;

  // Verify museum exists
  const museumExists = await Museum.findById(museumId);
  if (!museumExists) {
    return next(new HttpError("Museum not found", 404));
  }

  let error = [];
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // Process each artwork ID
    for (const artworkId of artworkIds) {
      const artwork = await Artwork.findOne({
        _id: artworkId,
        id_artist: artistId,
      }).session(session);
      if (!artwork) {
        return next(
          new HttpError(
            `Artwork with ID ${artworkId} not 
            found or does not belong to the artist`,
            401
          )
        );
      }

      const alreadyAdded = await MuseumArtwork.findOne({
        artworkId,
        museumId,
      }).session(session);
      if (alreadyAdded) {
        // return next(
        //   new HttpError(
        //     `Artwork '${artwork.title}' is already added before`,
        //     401
        //   )
        // );
        error.push(`Artwork '${artwork.title}' is already added before`);
        continue;
      }

      if (!museumExists.artworkIds.includes(artworkId)) {
        museumExists.artworkIds.push(artworkId);
        await museumExists.save({ session });
      }

      const museumArtwork = new MuseumArtwork({
        artworkId,
        museumId,
        exclusive: false,
      });
      await museumArtwork.save({ session });
    }
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    next(new HttpError("Failed to add artworks to museum", 500));
  }
  res.status(201).json({
    message: "Artworks added to museum successfully",
    error,
  });
});

exports.getMuseumsByDates = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    next(new HttpError("You must provide both a start and end date.", 400));
  }
  const museums = await Museum.find({
    dateStart: { $gte: new Date(startDate) },
    dateEnd: { $lte: new Date(endDate) },
  });

  if (!museums.length) {
    return new HttpError("No museums found within the specified dates.", 404);
  }

  res.status(200).json({ message: "Museums retrieved successfully", museums });
});

/**
 * @desc    Get museums by user ID
 * @route   GET /api/museum/user/:userId
 * @access  Private
 */
exports.getMuseumsByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const today = new Date();

  try {
    const participants = await Participant.find({
      participantId: userId,
    }).populate({
      path: "museumId",
      populate: {
        path: "idCategory",
        select: "name",
      },
    });

    if (!participants) {
      return next(
        new HttpError("User is not a participant in any museum", 404)
      );
    }

    if (participants.length === 0) {
      return res.status(206).json({
        message: "you have 0 passes!",
        museums: [],
      });
    }

    const museums = participants
      .map((participant) => participant.museumId)
      .filter((museum) => new Date(museum.dateEnd) > today);

    res.status(200).json({
      message: "Museums retrieved successfully",
      museums,
    });
  } catch (error) {
    return next(new HttpError("Failed to retrieve museums", 500));
  }
});

/**
 * @desc    Check if user is a participant in the museum
 * @route   GET /api/museum/isParticipant/:museumId
 * @access  Private
 */
exports.isParticipant = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const museumId = req.params.museumId;

  try {
    const participant = await Participant.findOne({
      museumId,
      participantId: userId,
    });

    if (participant) {
      return res.status(200).json({
        message: "User is a participant in the museum",
        isParticipant: true,
      });
    } else {
      return res.status(200).json({
        message: "User is not a participant in the museum",
        isParticipant: false,
      });
    }
  } catch (error) {
    return next(new HttpError("Failed to check participation status", 500));
  }
});

/**
 * @desc    Get artworks of a museum by museum ID
 * @route   GET /api/museum/:museumId/artworks
 * @access  Private
 */
exports.getArtworksOfMuseum = asyncHandler(async (req, res, next) => {
  const museumId = req.params.museumId;

  try {
    const museumArtworks = await MuseumArtwork.find({ museumId }).populate({
      path: "artworkId",
      match: {
        isDeletedByOwner: false,
        Sold: false,
        visibility: "public",
        status: "approved",
      },
      populate: [
        {
          path: "id_artist",
          select: "username , profileImage",
        },
        {
          path: "id_category",
          select: "name",
        },
      ],
    });

    // Filter out any null artworkId that did not match the criteria
    const validArtworks = museumArtworks.filter(
      (museumArtwork) => museumArtwork.artworkId
    );

    if (validArtworks.length === 0) {
      res.status(200).json({
        message: "Artworks retrieved successfully",
        artworks:[],
      });
      return;
    }

    if (!validArtworks || validArtworks.length === 0) {
      return next(new HttpError("No artworks found for this museum", 404));
    }

    const artworks = validArtworks.map(
      (museumArtwork) => museumArtwork.artworkId
    );

    res.status(200).json({
      message: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    return next(new HttpError("Failed to retrieve artworks", 500));
  }
});
