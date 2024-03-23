const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const planSchema = new mongoose.Schema({
  // Type of plan (e.g., "premium", "platinum")
  planType: {
    type: String,
    enum: ['premium', 'platinum'], // Available plan types
    required: true
  },
  // Start date of the plan
  dateStart: {
    type: Date,
    required: true
  },
  // End date of the plan
  dateEnd: {
    type: Date,
    required: true
  },
  // ID of the artist associated with this plan
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  }
});

// Apply the unique validator plugin to the schema
planSchema.plugin(uniqueValidator);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
