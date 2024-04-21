const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Museum = require("../models/museum");
const Participant = require("../models/participant");
const Artwork = require("../models/artwork");
const mongoose = require("mongoose");
const MuseumArtwork = require("../models/museumArtwork");
const { isCategoryExist } = require("./CategoryController");

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
  const museums = await Museum.find();

  if (!museums || museums.length === 0) {
    return next(new HttpError("No museums found", 404));
  }

  res.status(200).json({
    message: "Museums retrieved successfully",
    museums,
  });
});

exports.getParticipantArtists = asyncHandler(async (req, res, next) => {
  const museumId = req.body.museumId;

  const participantArtists = await Participant.find({
    museumId,
    participantType: "artist",
  }).populate("participantId");

  if (!participantArtists || participantArtists.length === 0) {
    return res.status(404).json({
      note: "vide",
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
