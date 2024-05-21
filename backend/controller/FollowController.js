const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Follow = require("../models/follow");
const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * @desc    Check if the Client Following the given Artist
 * @route   GET /api/follow/isFollowing
 * @access  Private
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
 * @route   PUT /api/follow/followArtist/:artistId
 * @access  Private
 */
exports.followArtist = async (req, res, next) => {
  const clientId = req.user._id;
  const artistId = req.body.artistId;

  try {
    // Check if the client is already following the artist
    const isFollowing = await Follow.findOne({ clientId, artistId });
    if (isFollowing) {
      return next(new HttpError("You are already following this artist", 400));
    }
    const follow = new Follow({
      clientId,
      artistId,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    const Artist = await User.findByIdAndUpdate(
      artistId,
      { $inc: { numberOfFollowers: 1 } },
      { new: true, session }
    );

    if (!Artist) {
      return next(new HttpError("Order not found", 404));
    }
    await follow.save({ session });
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: `You are now following artist ${artistId}` });
  } catch (err) {
    return next(new HttpError("Failed to follow the artist", 500));
  }
};

/**
 * @desc    Unfollow an artist
 * @route   DELETE /api/follow/unfollowArtist/:artistId
 * @access  Private
 */
exports.unfollowArtist = async (req, res, next) => {
  const clientId = req.user._id;
  const artistId = req.body.artistId; // Extract artistId from URL parameter

  try {
    // Check if the client is currently following the artist
    const isFollowing = await Follow.findOne({ clientId, artistId });
    if (!isFollowing) {
      return next(
        new HttpError("You are not currently following this artist", 400)
      );
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    const Artist = await User.findByIdAndUpdate(
      artistId,
      { $inc: { numberOfFollowers: -1 } },
      { new: true, session }
    );

    if (!Artist) {
      return next(new HttpError("Order not found", 404));
    }
    await Follow.findOneAndDelete({ clientId, artistId }, { session });
    await session.commitTransaction();
    session.endSession();
    // Delete the follow document

    res.status(200).json({ message: `You have unfollowed artist ${artistId}` });
  } catch (err) {
    return next(new HttpError("Failed to unfollow the artist", 500));
  }
};

/**
 * @desc    Get followers of an artist
 * @route   GET /api/follow/followers
 * @access  Private
 */
exports.getFollowers = asyncHandler(async (req, res, next) => {
  const artistId = req.params.id;

  try {
    // Find all followers of the artist
    const followers = await Follow.find({ artistId }).populate(
      "clientId",
      "username profileImage"
    );

    if (!followers || followers.length === 0) {
      return res.json({ msg: "No followers found", followers: [] });
    }

    res.json({
      msg: "Followers retrieved successfully",
      followers,
    });
  } catch (error) {
    next(new HttpError("Failed to get followers", 500));
  }
});

/**
 * @desc    Get followers of an artist
 * @route   GET /api/follow/FollowedArtists
 * @access  Private
 */
exports.getFollowedArtists = asyncHandler(async (req, res, next) => {
  const clientId = req.user._id;

  try {
    // Find all followers of the artist
    const followed = await Follow.find({ clientId }).populate(
      "artistId",
      "username profileImage"
    );

    if (!followed || followed.length === 0) {
      return res.json({ msg: "No followed artists are found", followed: [] });
    }

    res.json({
      msg: "Followed artists retrieved successfully",
      followed,
    });
  } catch (error) {
    next(new HttpError("Failed to get followed artists", 500));
  }
});

/**
 * @desc    remove a client follow by artist
 * @route   DELETE /api/follow/removeFollower/:clientId
 * @access  Private
 */
exports.removeFollower = async (req, res, next) => {
  const artistId = req.user._id;
  const clientId = req.params.clientId;

  try {
    const isFollowing = await Follow.findOne({ clientId, artistId });
    if (!isFollowing) {
      return next(
        new HttpError("You are not currently following this artist", 400)
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    const Artist = await User.findByIdAndUpdate(
      artistId,
      { $inc: { numberOfFollowers: -1 } },
      { new: true, session }
    );

    if (!Artist) {
      return next(new HttpError("Order not found", 404));
    }

    await Follow.findOneAndDelete({ clientId, artistId });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: `You have removed the client ${clientId}` });
  } catch (err) {
    return next(new HttpError("Failed to unfollow the artist", 500));
  }
};

exports.isFollowingCheck = async (artistId, clientId) => {
  const isFollowing = await Follow.findOne({ clientId, artistId });
  return !!isFollowing; // Convert to boolean
};
