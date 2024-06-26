const HttpError = require("../models/http-error");
const SavedArtworks = require("../models/savedArtworks");
const Artwork = require("../models/artwork");
const asyncHandler = require("express-async-handler");

/**
 * @desc    Get all saved artworks by a user
 * @route   GET /api/liked/saved/getSavedArtworks
 * @access  Private
 */
exports.getSavedArtworks = asyncHandler(async (req, res, next) => {
  const clientId = req.user._id;
  let savedArtworks;
  try {
    savedArtworks = await SavedArtworks.find({ clientId }).populate({
      path: "artworkId",
      populate: [
        { path: "id_category", select: "name" },
        { path: "id_artist", select: "username profileImage" },
      ],
    });
  } catch (err) {
    return next(new HttpError(" Failed to retrieve saved artworks ! ", 500));
  }
  if (savedArtworks.length === 0) {
    return res.json({ msg: "vide", savedArtworks });
  }
  res.json({
    msg: "Artworks saved retrieved successfully",
    savedArtworks,
  });
});

/**
 * @desc     save an artwork
 * @function ADD
 * @method   post
 * @route    POST api/liked/saved/saveArtwork
 * @params   artistId, artworkId
 * @access   Private
 */

exports.saveArtwork = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const artworkId = req.body.artworkId;

  try {
    // Check if artworkId is valid
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }

    // Add artworkId to savedArtworks
    const savedArtwork = new SavedArtworks({
      artworkId,
      clientId: userId,
    });
    await savedArtwork.save();

    res.status(200).json({ message: "Artwork has been saved successfully" });
  } catch (error) {
    next(new HttpError("Failed to save the artwork ", 500));
  }
});

/**
 * @desc     unsave an artwork
 * @function Update
 * @method   Delete
 * @route    DELETE api/liked/saved/unsaveArtwork
 * @params   artworkId
 * @access   Private
 */

exports.unsaveArtwork = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const artworkId = req.body.artworkId;

  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }

    const savedArtwork = await SavedArtworks.findOneAndDelete({
      artworkId,
      clientId: userId,
    });

    if (!savedArtwork) {
      // If the artwork was not found in the saved artworks list, it's already unsaved
      return res.status(200).json({ message: "Artwork is already unsaved" });
    }

    res.status(200).json({ message: "Artwork has been unsaved successfully" });
  } catch (error) {
    next(new HttpError("Failed to unsave the artwork", 500));
  }
});

/**
 * @desc    Check if an artwork is saved by a user
 * @route   GET /api/liked/saved/isSaved/:artworkId
 * @access  Private
 */
exports.isSaved = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const artworkId = req.params.artworkId;

  try {
    const savedArtwork = await SavedArtworks.findOne({ clientId: userId, artworkId });

    if (savedArtwork) {
      return res.status(200).json({ isSaved: true });
    } else {
      return res.status(200).json({ isSaved: false });
    }
  } catch (err) {
    return next(new HttpError("Failed to check if artwork is saved", 500));
  }
});