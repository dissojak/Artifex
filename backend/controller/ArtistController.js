const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Artist = require("../models/user");
const Artwork = require("../models/artwork");
const { checkPlan } = require("./PlanController");
const { artistRating } = require("./AnalyticsController");
const { getCategoryName } = require("./CategoryController");
const { isFollowingCheck } = require("./FollowController");

/**
 * @desc    open the order feature fro clients by artist
 * @route   PUT /api/artist/openOrder
 * @params  normalPrice, rapidPrice
 * @access  Private
 */
exports.openOrder = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { normalPrice, rapidPrice } = req.body;
  const artistId = req.user._id;

  try {
    const artist = await Artist.findOneAndUpdate(
      { _id: artistId },
      {
        orderStatus: true,
        normalPrice: normalPrice,
        rapidPrice: rapidPrice,
      },
      { new: true }
    );

    if (!artist) {
      return next(new HttpError("Artist not found", 404));
    }

    res.status(200).json({
      message: "Order statu updated successfully",
      artist,
    });
  } catch (error) {
    return next(
      new HttpError("Failed to update order statue for this artist", 500)
    );
  }
});

/**
 * @desc    update artist social media
 * @route   PATCH /api/artist/socialMedia
 * @params  instagram,facebook,twitter,linked,phone_number (optional)
 * @access  Private
 */
exports.socialMedia = asyncHandler(async (req, res, next) => {
  const artistId = req.user._id;

  let artist = await Artist.findById(artistId);
  if (!artist) {
    return next(new HttpError("Artist not found", 404));
  }

  artist.instagram = req.body.instagram || artist.instagram;
  artist.twitter = req.body.twitter || artist.twitter;
  artist.linkedin = req.body.linkedin || artist.linkedin;
  artist.facebook = req.body.facebook || artist.facebook;
  artist.phone_number = req.body.phone_number || artist.phone_number;

  await artist.save();

  res.status(200).json({
    message: "Social media information updated successfully",
    artist,
  });
});

/**
 * @desc    Get artist by ID
 * @params  id
 */
exports.getArtistById = async (id) => {
  try {
    const artist = await Artist.findOne({ _id: id, userType: "artist" });

    if (!artist) {
      return next(new HttpError("Artist not found", 404));
    }

    res.status(200).json({
      message: "Artist fetched successfully",
      artist,
    });
  } catch (error) {
    return next(new HttpError("Failed to fetch artist", 500));
  }
};

/**
 * @desc    Get all artists
 * @route   GET /api/artist/artists
 * @access  Private
 */
exports.getArtists = asyncHandler(async (req, res, next) => {
  const clientId = req.user._id;
  try {
    // Assuming 'userType' field in User model differentiates between artists and other types of users
    const artists = await Artist.find({ userType: "artist", banned: false });

    if (!artists || artists.length === 0) {
      return next(new HttpError("No artists found", 404));
    }

    const artistsWithDetails = await Promise.all(
      artists.map(async (artist) => {
        return {
          id: artist._id,
          username: artist.username,
          email: artist.email,
          plan: await checkPlan(artist._id),
          numberOfArtworks: await Artwork.countDocuments({
            id_artist: artist._id,
            visibility: "public",
            exclusive: false,
            isDeletedByOwner: false,
            Sold: false,
          }),
          rating: await artistRating(artist._id),
          category: await getCategoryName(artist.idCategory),
          isFollowing: await isFollowingCheck(artist._id, clientId),
          profileImage: artist.profileImage,
          numberOfFollowers: artist.numberOfFollowers,
          phone_number: artist.phone_number,
          instagram: artist.instagram,
          twitter: artist.twitter,
          linkedin: artist.linkedin,
        };
      })
    );
    res.json({
      artists: artistsWithDetails,
    });
  } catch (error) {
    return next(new HttpError("Failed to retrieve artists", 500));
  }
});


/**
 * @desc    Count artworks of an artist
 * @route   GET /api/artwork/count/:artistId
 * @access  Private
 */
exports.countArtworksByArtist = asyncHandler(async (req, res, next) => {
  const artistId = req.params.artistId;

  try {
    // Count the number of artworks by the given artist
    const artworkCount = await Artwork.countDocuments({ id_artist: artistId });

    res.status(200).json({
      message: "Artworks count retrieved successfully",
      count: artworkCount,
    });
  } catch (err) {
    return next(new HttpError("Failed to count artworks, please try again", 500));
  }
});