const mongoose = require('mongoose');

// Define the schema
const participantSchema = new mongoose.Schema({
  // ID of the museum
  museumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Museum', // Assuming 'Museum' is the name of the Museum model
    required: true
  },
  // ID of the client or artist
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the User model
    required: true
  }
});

// Create the model
const Participant = mongoose.model('Participant', participantSchema);

// Export the model
module.exports = Participant;
