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
    savedArtworks = await SavedArtworks.find({ clientId });
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

exports.SaveArtwork = asyncHandler(async (req, res, next) => {
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
