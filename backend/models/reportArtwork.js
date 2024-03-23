const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema
const reportArtworkSchema = new mongoose.Schema({
  // Report classification
  reportClass: {
    type: String,
    enum: ['Spam', 'Nudity/Pornography', 'Hate Speech/Discrimination', 'Harassment/Bullying', 'Violence/Gore', 'Copyright Infringement', 'Inappropriate Content'],
    required: true
  },
  // ID of the client who reported
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  },
  // ID of the artwork being reported
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork', // Assuming 'Artwork' is the name of the Artwork model
    required: true
  }
});

// Apply the unique validator plugin to the schema
reportArtworkSchema.plugin(uniqueValidator);

// Create the model
const ReportArtwork = mongoose.model('ReportArtwork', reportArtworkSchema);

// Export the model
module.exports = ReportArtwork;
