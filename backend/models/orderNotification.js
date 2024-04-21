const mongoose = require('mongoose');

const orderNotificationSchema = new mongoose.Schema({
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
    enum: ['create', 'done' , 'reject', 'accept','pay'],
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
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

const OrderNotification = mongoose.model('OrderNotification', orderNotificationSchema);

module.exports = OrderNotification;
