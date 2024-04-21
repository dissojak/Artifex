const mongoose = require('mongoose');

const artworkNotificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['create'],
    required: true
  },
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  vu:{
    type :Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ArtworkNotification = mongoose.model('ArtworkNotification', artworkNotificationSchema);

module.exports = ArtworkNotification;
