const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const User = require("../models/user");
const OrderNotification = require("../models/orderNotification");
const mongoose = require("mongoose");
const { default: axios } = require("axios");

// @desc    Get orders for a specific client
// @route   GET /api/order/client
// @access  Private

exports.getClientOrders = asyncHandler(async (req, res, next) => {
  const clientId = req.user._id;
  // console.log(clientId);

  try {
    const orders = await Order.find({ clientId }).populate("artistId");

    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found for this client" });
    }

    if (orders.length === 0) {
      return res.status(200).json({
        message: "No orders found for this client , he have 0",
        orders:[],
      });
    }
    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (err) {
    return next(
      new HttpError("Failed to retrieve orders for this client", 500)
    );
  }
});

// @desc    Get orders for a specific artist
// @route   GET /api/order/artist
// @access  Private

exports.getArtistOrders = asyncHandler(async (req, res, next) => {
  const artistId = req.user._id;

  try {
    const orders = await Order.find({ artistId }).populate("clientId");

    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found for this artist" });
    }

    if (orders.length === 0) {
      return res.status(200).json({
        message: "No orders found for this artist , he have 0",
        orders:[],
      });
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    return next(
      new HttpError("Failed to retrieve orders for this artist", 500)
    );
  }
});

const generateOrderId = async () => {
  let orderId;
  do {
    orderId = Math.floor(10000 + Math.random() * 90000).toString();
  } while (await Order.exists({ orderId }));

  return orderId;
};

// @desc    make a new order by client to an artist
// @route   POST /api/order/new
// @access  Private
exports.makeOrder = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }
  const { artistId, description, serviceType } = req.body;
  const clientId = req.user._id;
  const io = req.app.io;
  const socketIds = req.app.socketIds;
  console.log(socketIds);

  const orderId = await generateOrderId();
  const date = new Date();

  const order = new Order({
    orderId,
    date,
    serviceType,
    clientId,
    artistId,
    description,
  });

  const notification = new OrderNotification({
    recipientId: artistId,
    senderId: clientId,
    action: "create",
    orderId: order._id,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await order.save({ session });
    await notification.save({ session });
    await session.commitTransaction();
    session.endSession();
  } catch (e) {
    return next(
      new HttpError("Couldn't add the new order and save notification", 500)
    );
  }

  const client = await User.findById(clientId);
  if (!client) {
    return next(new HttpError("Couldn't find this client", 422));
  }
  const orderNotificationDetails = {
    orderId,
    username: client.username,
    profileImage: client.profileImage,
    serviceType,
    date,
  };

  try {
    const artistSocketEntry = socketIds.find(
      (entry) => entry.userId.toString() === artistId.toString()
    );
    if (artistSocketEntry) {
      const artistSocketId = artistSocketEntry.socketId;
      // Now, use artistSocketId to send the notification
      io.to(artistSocketId).emit("newOrder", { orderNotificationDetails });
      console.log(
        "Real-time notification sent to artist with socket ID",
        artistSocketId
      );
    } else {
      console.log("Artist's socket ID not found.");
    }
  } catch (err) {
    return next(new HttpError("Couldn't send the real-time notification", 500));
  }

  res.status(201).json({
    message: "Order created successfully",
    order,
  });
});

// @desc    accept order of a client
// @route   PUT /api/order/accept
// @access  Private
exports.acceptOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.body.orderId;
  const io = req.app.io;
  const socketIds = req.app.socketIds;

  const order = await Order.findOneAndUpdate(
    { orderId },
    { status: "accepted" },
    { new: true }
  );

  if (!order) {
    return next(new HttpError("Order not found", 404));
  }

  const notification = new OrderNotification({
    recipientId: order.clientId,
    senderId: order.artistId,
    action: "accept",
    orderId: order._id,
  });

  await notification.save();

  const artist = await User.findById(order.artistId);
  if (!artist) {
    return next(new HttpError("Couldn't find this artist", 422));
  }

  const date = new Date ();
  const orderNotificationDetails = {
    orderId,
    username: artist.username,
    profileImage: artist.profileImage,
    serviceType:order.serviceType,
    date,
  };

  const clientSocketEntry = socketIds.find(
    (entry) => entry.userId.toString() === order.clientId.toString()
  );
  if (clientSocketEntry) {
    const clientSocketId = clientSocketEntry.socketId;
    io.to(clientSocketId).emit("orderAccept", { orderNotificationDetails });
    console.log(
      "Order acceptance notification sent to client with socket ID",
      clientSocketId
    );
  } else {
    console.log(
      "Client's socket ID not found, could not send real-time notification."
    );
  }
  res.status(200).json({ message: "Order accepted successfully", order });
});

exports.orderPayment = async (req, res) => {

  const url = "https://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "d01440af-5a3b-4c9f-8567-6c0f964d1ef7",
    app_secret: "dd3163a3-a4ad-4ec5-8875-e5658b3ef0ff",
    amount: req.body.amount,
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: "http://localhost:3000/order/success",
    fail_link: "http://localhost:3000/order/fail",
    developer_tracking_id: "a702c74a-9a4d-4f36-b18d-b76f63b7bef8",
  };

  const response = await axios.post(url, payload);
  const orderId = req.body.orderId;

  if (response.data && response.data.result && response.data.result.success) {
    return res.status(200).send({
      paymentInfo: response.data,
    });
  }
};

// @desc    pay order of a client
// @route   POST /api/order/pay
// @access  Private
exports.payOrder = asyncHandler(async (req, res, next) => {
  const io = req.app.io;
  const socketIds = req.app.socketIds;

  const orderId = req.body.orderId;
  const paymentId = req.body.paymentId;

  const url = `https://developers.flouci.com/api/verify_payment/${paymentId}`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      apppublic: "d01440af-5a3b-4c9f-8567-6c0f964d1ef7",
      appsecret: "dd3163a3-a4ad-4ec5-8875-e5658b3ef0ff",
    },
  });

  const order = await Order.findOneAndUpdate(
    { orderId },
    { status: "payed" },
    { new: true }
  );

  if (response.data && response.data.result.status === "SUCCESS") {
    if (!order) {
      return next(new HttpError("Order not found", 404));
    }

    const notification = new OrderNotification({
      recipientId: order.artistId,
      senderId: order.clientId,
      action: "payed",
      orderId: order._id,
    });

    await notification.save();

    const artistSocketEntry = socketIds.find(
      (entry) => entry.userId.toString() === order.artistId.toString()
    );
    if (artistSocketEntry) {
      const artistSocketEntry = artistSocketEntry.socketId;
      io.to(artistSocketEntry).emit("orderPayed", { orderId: order._id });
      console.log(
        "Order payment notification sent to artist with socket ID",
        artistSocketEntry
      );
    } else {
      console.log(
        "Artist's socket ID not found, could not send real-time notification."
      );
    }
    res.status(200).json({
      success: true,
      paymentVerif: response.data,
      message: "Order payment successided",
      order,
    });
  } else {
    res.status(400).send({
      message: "Payment verification failed",
      success: false,
      paymentVerif: response.data,
    });
  }
});

// @desc    reject order of a client
// @route   PUT /api/order/reject
// @access  Private
exports.rejectOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.body.orderId;
  const io = req.app.io;
  const socketIds = req.app.socketIds;

  const order = await Order.findOneAndUpdate(
    { orderId },
    { status: "rejected" },
    { new: true }
  );

  if (!order) {
    return next(new HttpError("Order not found", 404));
  }

  const notification = new OrderNotification({
    recipientId: order.clientId,
    senderId: order.artistId,
    action: "reject",
    orderId: order._id,
  });

  await notification.save();

  const clientSocketEntry = socketIds.find(
    (entry) => entry.userId.toString() === order.clientId.toString()
  );
  if (clientSocketEntry) {
    const clientSocketId = clientSocketEntry.socketId;
    io.to(clientSocketId).emit("orderRejected", { orderId: order._id });
    console.log(
      "Order rejection notification sent to client with socket ID",
      clientSocketId
    );
  } else {
    console.log(
      "Client's socket ID not found, could not send real-time notification."
    );
  }

  res.status(200).json({ message: "Order reject  successfully", order });
});

/*
also we need to sett the status of the order to payed 
after the artist accept it , it will apear pay to client 
and when he pay it will be back too pending , and send 
notification to artist with action 'pay'
*/

// @desc    submit work of a artist to order
// @route   PATCH /api/order/submit
// @access  Private
exports.submitOrder = asyncHandler(async (req, res, next) => {
  const { image_liv, orderId } = req.body;
  const io = req.app.io;
  const socketIds = req.app.socketIds;

  const order = await Order.findOneAndUpdate(
    { orderId },
    {
      date_liv: new Date(),
      status: "completed",
      image_liv,
    },
    { new: true }
  );

  try {
    await order.save();
  } catch (e) {
    return next(new HttpError("Couldn't subimt the order", 500));
  }

  const notification = new OrderNotification({
    recipientId: order.clientId,
    senderId: order.artistId,
    action: "done",
    orderId: order._id,
  });

  await notification.save();

  const artist = await User.findById(order.artistId);
  if (!artist) {
    return next(new HttpError("Couldn't find this artist", 422));
  }

  const date = new Date ();
  const orderNotificationDetails = {
    orderId,
    username: artist.username,
    profileImage: artist.profileImage,
    serviceType:order.serviceType,
    date,
  };

  const clientSocketEntry = socketIds.find(
    (entry) => entry.userId.toString() === order.clientId.toString()
  );
  if (clientSocketEntry) {
    const clientSocketId = clientSocketEntry.socketId;
    io.to(clientSocketId).emit("orderSubmit", { orderNotificationDetails });
    console.log(
      "Order submission notification sent to client with socket ID",
      clientSocketId
    );
  } else {
    console.log(
      "Client's socket ID not found, could not send real-time notification."
    );
  }

  res.status(200).json({ message: "Order submitted successfully", order });
});

// just for testing
exports.findOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.body;

  const order = await Order.findOne({ orderId });
  if (!order) {
    return next(new HttpError("Order not found", 404));
  }
  res.status(200).json({ message: "Order submitted successfully", order });
});

exports.list = async (req, res, next) => {
  res.status(200).json({ socketIds: req.app.socketIds });
  console.log(req.app.socketIds);
};
