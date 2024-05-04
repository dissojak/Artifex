const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const followSchema = new mongoose.Schema({
  // Client ID who is following the artist
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  },
  // Artist ID who is being followed by the client
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  },
  dateFollow:{
    type: Date,
    default: Date.now,
  }
});

followSchema.plugin(uniqueValidator);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
