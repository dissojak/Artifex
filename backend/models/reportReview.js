const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema
const reportReviewSchema = new mongoose.Schema({
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
  // ID of the Review being reported
  ReviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // Assuming 'Review' is the name of the Review model
    required: true
  }
});

// Apply the unique validator plugin to the schema
reportReviewSchema.plugin(uniqueValidator);

// Create the model
const ReportReview = mongoose.model('ReportReview', reportReviewSchema);

// Export the model
module.exports = ReportReview;
