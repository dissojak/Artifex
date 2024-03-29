const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Follow = require("../models/follow");
const User = require("../models/user");

/**
 * @desc    Check if the Client Following the given Artist
 * @route   GET /api/follow/isFollowing
 * @access  Privateq
 */
exports.isFollowing = asyncHandler(async (req, res, next) => {
  const clientId = req.user._id;
  const artistId = req.body.artistId;
  try {
    const isFollowing = await Follow.findOne({ clientId, artistId });

    const followingStatus = !!isFollowing; // Convert to boolean
    res.status(200).json({
      msg: `clinet  '${clientId}' is following '${artistId}' ?`,
      isFollowing: followingStatus,
    });
  } catch (err) {
    throw new Error("Failed to check follow status");
  }
});

/**
 * @desc    Follow an artist
 * @route   POST /api/follow/followArtist/:artistId
 * @access  Private
 */
exports.followArtist = async (req, res, next) => {
  const clientId = req.user._id;
  const artistId = req.params.artistId;

  try {
    // Check if the client is already following the artist
    const isFollowing = await Follow.findOne({ clientId, artistId });
    if (isFollowing) {
      return next(new HttpError('You are already following this artist', 400));
    }
    const follow = new Follow({
      clientId,
      artistId,
    });
    await follow.save();

    res.status(201).json({ message: `You are now following artist ${artistId}` });
  } catch (err) {
    return next(new HttpError('Failed to follow the artist', 500));
  }
};

/**
 * @desc    Unfollow an artist
 * @route   DELETE /api/follow/unfollowArtist/:artistId
 * @access  Private
 */
exports.unfollowArtist = async (req, res, next) => {
  const clientId = req.user._id;
  const artistId = req.params.artistId; // Extract artistId from URL parameter

  try {
    // Check if the client is currently following the artist
    const isFollowing = await Follow.findOne({ clientId, artistId });
    if (!isFollowing) {
      return next(new HttpError('You are not currently following this artist', 400));
    }

    // Delete the follow document
    await Follow.findOneAndDelete({ clientId, artistId });

    res.status(200).json({ message: `You have unfollowed artist ${artistId}` });
  } catch (err) {
    return next(new HttpError('Failed to unfollow the artist', 500));
  }
};