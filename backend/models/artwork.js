const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const artworkSchema = new mongoose.Schema({
  // Title of the artwork
  title: {
    type: String,
    required: true // Title is required
  },
  // Description of the artwork
  description: {
    type: String,
    minlength: [10, 'Description must be at least 10 characters long'], // Minimum length of 10 characters
    maxlength: [100, 'Description cannot exceed 100 characters'] // Maximum length of 100 characters
  },
  // Price of the artwork
  price: {
    type: Number,
    default: 0 // Default price is 0
  },
  // Image of the artwork
  imageArtwork:{
    type: String,
    required: true // Image is required
  },
  // Category ID referencing the Category model
  id_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Assuming 'Category' is the name of the related model
  },
  // Artist ID referencing the User model
  id_artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming 'User' is the name of the related model
  },
  // Type of the artwork (public or private)
  type: {
    type: String,
    enum: ['public', 'private'], // Type can only be 'public' or 'private'
    default: 'public' // Default type is 'public'
  },
  exclusive:{
    type : Boolean,
    default: false,
  },
});

artworkSchema.plugin(uniqueValidator);

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
