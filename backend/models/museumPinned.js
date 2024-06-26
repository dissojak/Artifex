const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const museumPinnedSchema = new mongoose.Schema({
  // Client ID who liked the artwork
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Museum ID that got liked
  museumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Museum',
    required: true
  }
});

museumPinnedSchema.plugin(uniqueValidator);

const MuseumPinned = mongoose.model('MuseumPinned', museumPinnedSchema);

module.exports = MuseumPinned;
