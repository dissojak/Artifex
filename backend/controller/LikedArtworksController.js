const HttpError = require("../models/http-error");
const LikedArtworks = require("../models/likedArtworks");
const Analytics = require("../models/analytics");
const Artwork = require("../models/artwork");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

/**
 * @desc    Get all liked artworks by a user
 * @route   GET /api/liked/saved/getLikedArtworks
 * @access  Private
 */
exports.getLikedArtworks = asyncHandler(async (req, res, next) => {
  const clientId = req.user._id;
  let likedArtworks;
  try {
    likedArtworks = await LikedArtworks.find({ clientId });
  } catch (err) {
    return next(new HttpError(" Failed to retrieve liked artworks ! ", 500));
  }
  if (likedArtworks.length === 0) {
    return res.json({ msg: "vide", likedArtworks });
  }
  res.json({
    msg: "Artworks liked retrieved successfully",
    likedArtworks,
  });
});

/**
 * @desc     like an artwork
 * @function Update
 * @method   PATCH
 * @route    PATCH api/liked/saved/likeArtwork
 * @params   artistId, artworkId
 * @access   Private
 */

exports.likeArtwork = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { artworkId, artistId } = req.body;

  let analytics;

  try {
    // Check if artworkId is valid
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }

    // Find or create analytics for the artwork
    analytics = await Analytics.findOne({ artistId });
    if (!analytics) {
      analytics = new Analytics({ artistId });
    }

    analytics.likesAnalytics+=1;

    // Add artworkId to savedArtworks
    const likedArtwork = new LikedArtworks({
      artworkId,
      clientId: userId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await likedArtwork.save({ session });
    await analytics.save({ session });
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Artwork has been got liked successfully" });
  } catch (error) {
    next(new HttpError("Failed to like this artwork ", 500));
  }
});
