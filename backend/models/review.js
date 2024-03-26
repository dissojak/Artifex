const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const reviewSchema = new mongoose.Schema({
  // Rating (1 to 5)
  rating: {
    type: Number,
    required: true,
    default:0,
    max: 5
  },
  // Comment
  comment: {
    type: String,
    default:""
  },
  // View (true/false)
  view: {
    type: Boolean,
    default: false
  },
  // Client ID
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  },
  // Artwork ID
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork', // Assuming 'Artwork' is the name of the Artwork model
    required: true
  }
});

reviewSchema.plugin(uniqueValidator);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
