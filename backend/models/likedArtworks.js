const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const likedArtworksSchema = new mongoose.Schema({
  // Client ID who liked the artwork
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  },
  // Artwork ID that got liked
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork', // Assuming 'Artwork' is the name of the Artwork model
    required: true
  }
});

likedArtworksSchema.plugin(uniqueValidator);

const LikedArtworks = mongoose.model('LikedArtworks', likedArtworksSchema);

module.exports = LikedArtworks;
