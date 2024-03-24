const HttpError = require("../models/http-error");
const LikedArtworks = require("../models/likedArtworks");
const asyncHandler = require("express-async-handler");

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
  