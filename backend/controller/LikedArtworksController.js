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
    likedArtworks = await LikedArtworks.find({ clientId })
    .populate({
      path: "artworkId",
      populate: [
        { path: "id_category", select: "name" },
        { path: "id_artist", select: "username profileImage" }
      ]
    });
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
 * @function Add
 * @method   post
 * @route    POST api/liked/saved/likeArtwork
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

    analytics.likesAnalytics += 1;

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

/**
 * @desc     Unlike an artwork
 * @function Update
 * @method   delete
 * @route    DELETE /api/liked/saved/unlikeArtwork
 * @params   artworkId, artistId
 * @access   Private
 */

exports.unlikeArtwork = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { artworkId, artistId } = req.body;

  let analytics;

  try {
    // Check if artworkId is valid
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }

    // Find the liked artwork record
    const likedArtwork = await LikedArtworks.findOneAndDelete({
      artworkId,
      clientId: userId,
    });

    if (!likedArtwork) {
      return res.status(200).json({ message: "Artwork is already unliked" });
    }

    analytics = await Analytics.findOne({ artistId });
    if (!analytics) {
      analytics = new Analytics({ artistId });
    }

    if (analytics.likesAnalytics > 0) {
      analytics.likesAnalytics -= 1;
    } else {
      throw new HttpError("there is problem with the analytics", 401);
    }

    await analytics.save();

    res.status(200).json({ message: "Artwork has been unliked successfully" });
  } catch (error) {
    next(new HttpError("Failed to unlike this artwork ", 500));
  }
});

/**
 * @desc    Check if an artwork is liked by a user
 * @route   GET /api/liked/saved/isLiked/:artworkId
 * @access  Private
 */
exports.isLiked = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const artworkId = req.params.artworkId;

  try {
    const likedArtwork = await LikedArtworks.findOne({ clientId: userId, artworkId });

    if (likedArtwork) {
      return res.status(200).json({ isLiked: true });
    } else {
      return res.status(200).json({ isLiked: false });
    }
  } catch (err) {
    return next(new HttpError("Failed to check if artwork is liked", 500));
  }
});