const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema
const museumSchema = new mongoose.Schema({
  // Title of the museum
  title: {
    type: String,
    required: true,
    unique: true
  },
  // Description of the museum
  description: {
    type: String,
    required: true
  },
  // Maximum number of artists allowed
  numberMaxArtists: {
    type: Number,
    required: true
  },
  // Maximum number of clients allowed
  numberMaxClients: {
    type: Number,
    required: true
  },
  // Price for clients
  priceClient: {
    type: Number,
    required: true
  },
  // Price for artists
  priceArtist: {
    type: Number,
    required: true
  },
  // Start date of the museum
  dateStart: {
    type: Date,
    required: true
  },
  // End date of the museum
  dateEnd: {
    type: Date,
    required: true
  },
  // Indicates if the museum is exclusive
  isExclusive: {
    type: Boolean,
    required: true,
    default: false,
  },
  // ID of the category
  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Assuming 'Category' is the name of the Category model
    required: true
  },
  // IDs of the artworks associated with the museum
  artworkIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork' // Assuming 'Artwork' is the name of the Artwork model
  }],
  // number of the artists entered the museum
  artistsEntered: {
    type: Number,
    default:0,
  },
  // number of the clients entered the museum
  clientsEntered: {
    type: Number,
    default:0,
  }
});

// Apply the unique validator plugin to the schema
museumSchema.plugin(uniqueValidator);

// Create the model
const Museum = mongoose.model('Museum', museumSchema);

// Export the model
module.exports = Museum;
