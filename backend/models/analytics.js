const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const analyticsSchema = new mongoose.Schema({
  // Rating analytics
  ratingAnalytics: {
    type: Number,
    default: 0 // Default value for rating analytics
  },
  // Likes analytics
  likesAnalytics: {
    type: Number,
    default: 0 // Default value for likes analytics
  },
  // Views analytics
  viewsAnalytics: {
    type: Number,
    default: 0 // Default value for views analytics
  },
  // Number of comments
  numberOfComments: {
    type: Number,
    default: 0 // Default value for number of comments
  }
});

// Apply the unique validator plugin to the schema
analyticsSchema.plugin(uniqueValidator);

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
