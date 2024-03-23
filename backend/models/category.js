const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  // Name of the category
  name: {
    type: String,
    required: true, // Name is required
    unique: true // Name must be unique
  },
  // Creation timestamp
  createdAt: {
    type: Date,
    default: Date.now // Default to the current timestamp when the category is created
  }
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
