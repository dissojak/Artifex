const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const artworkSchema = new mongoose.Schema({
  // Title of the artwork
  title: {
    type: String,
    required: true, // Title is required
  },
  // Description of the artwork
  description: {
    type: String,
    minlength: [10, "Description must be at least 10 characters long"], // Minimum length of 10 characters
    maxlength: [400, "Description cannot exceed 400 characters"], // Maximum length of 100 characters
  },
  // Price of the artwork
  price: {
    type: Number,
    default: 0, // Default price is 0
  },
  // Image of the artwork
  imageArtwork: {
    type: String,
    required: true, // Image is required
  },
  // Category ID referencing the Category model
  id_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  // Artist ID referencing the User model
  id_artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // visibility of the artwork (public or private)
  visibility: {
    type: String,
    enum: ["public", "private"], // visibility can only be 'public' or 'private'
    default: "public", // Default type is 'public'
  },
  // is Artwork exclusive or not ?
  exclusive: {
    type: Boolean,
    default: false,
  },
  // is Artwork deleted by artist or not ?
  isDeletedByOwner: {
    type: Boolean,
    default: false,
  },
  Sold: {
    type: Boolean,
    default: false,
  },
  Buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ['pending','declined','approved'],
    default: 'pending'
  },
});

artworkSchema.plugin(uniqueValidator);

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
