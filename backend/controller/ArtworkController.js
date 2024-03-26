const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Artwork = require("../models/artwork");
const { getCategoryNameById } = require("../controller/CategoryController");

/**
 * @desc    Add new artwork
 * @route   POST /api/artwork/addArtwork
 * @params  title,description,price,imageArtwork,id_category
 * @access  Private
 */
exports.addArtwork = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const artistId = req.user._id;
  const {
    title,
    description,
    price,
    imageArtwork,
    id_category,
  } = req.body;

  try {
    // Create new artwork instance
    const newArtwork = new Artwork({
      title,
      description,
      price,
      imageArtwork,
      id_category,
      id_artist: artistId,
    });

    // Save artwork to database
    const artwork = await newArtwork.save();

    res.json({
      msg: "Artwork added successfully",
      artwork,
    });
  } catch (error) {
    next(new HttpError(error.message || "Failed to add artwork", 500));
  }
});

/**
 * @desc    Get artwork by ID
 * @route   GET /api/artwork/getArtwork/:id
 * @access  Private
 */
exports.getArtwork = asyncHandler(async (req, res, next) => {
  const artworkId = req.params.id;

  try {
      // Find the artwork by its ID and populate the category name
      const artwork = await Artwork.findById(artworkId).populate({
          path: 'id_category', // Populate the 'id_category' field
          select: 'name' // Select the 'name' 
          // select: 'name -_id' // Select only the 'name' field and exclude the '_id' field
      });

      if (!artwork) {
          return next(new HttpError("Artwork not found", 404));
      }

      res.json({
          msg: "Artwork retrieved successfully",
          artwork,
      });
  } catch (error) {
      next(new HttpError(error.message || "Failed to retrieve artwork", 500));
  }
});

