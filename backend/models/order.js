const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const orderSchema = new mongoose.Schema({
  // Order ID
  orderId: {
    type: String,
    required: true, // Order ID is required
    unique: true // Order ID must be unique
  },
  // Date of the order
  date: {
    type: Date,
    required: true // Date is required
  },
  // Service type (normal or rapid)
  serviceType: {
    type: String,
    enum: ['normal', 'rapid'], // Service type can only be 'normal' or 'rapid'
    default: 'normal', // Default service type is 'normal'
    required: true // serviceType is required
  },
  // Client ID referencing the User model
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the related model for clients
    required: true // Client ID is required
  },
  // Artist ID referencing the User model
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is the name of the related model for artists
    required: true // Artist ID is required
  },
  // Status of the order
  status: {
    type: String,
    enum: ['pending','completed','rejected','accepted'],
    default: 'pending' // Default status is 'pending'
  },
  // Delivery date
  date_liv: {
    type: Date,
  },
  // Image of the delivery
  image_liv: {
    type: String // URL or filename of the image
  },
  // description of the order
  description: {
    type: String,
  },
});

orderSchema.plugin(uniqueValidator);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
