const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const museumArtworkSchema = new mongoose.Schema({
  // artwork ID that identifies the artwork related to the museum
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  museumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Museum',
    required: true
  },
  //just for the history
  // represent if artwork is exclusive 
  exclusive:{
    type : Boolean,
    default: false,
  },
});

museumArtworkSchema.plugin(uniqueValidator);

const MuseumArtwork = mongoose.model('MuseumArtwork', museumArtworkSchema);

module.exports = MuseumArtwork;
