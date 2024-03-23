const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const cookieParser = require('cookie-parser');
const HttpError = require("./models/http-error");

const user = require("./routes/user");
const artist = require("./routes/artist");
const admin = require("./routes/admin");
const artwork = require("./routes/artwork");
const review = require("./routes/review");
const museum = require("./routes/museum");
const plan = require("./routes/plan");
const order = require("./routes/order");
const follow = require("./routes/follow");
const category= require("./routes/category");
const analytics = require("./routes/analytics");
const report= require("./routes/report");



const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE "
  );
  // res.setHeader("Content-Type", "multipart/form-data");
  next();
});

app.use("/api/user", user);
app.use("/api/artist", artist);
app.use("/api/admin", admin);
app.use("/api/artwork", artwork);
app.use("/api/review", review);
app.use("/api/museum",museum);
app.use("/api/plan", plan);
app.use("/api/order", order);
app.use("/api/follow", follow);
app.use("/api/category", category);
app.use("/api/analysis", analytics);
app.use("/api/report", report);



app.use((req, res, next) => {
  const error = new HttpError("Could not find this route !", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occurred" });
});

cloudinary.config({
  cloud_name: 'duvougrqx',
  api_key: '513133278582537',
  api_secret: '0UgeZPnsrmRfbWu-u8eZxo-W0uk',
});


// const CLOUDINARY_URL="CLOUDINARY_URL=cloudinary://513133278582537:0UgeZPnsrmRfbWu-u8eZxo-W0uk@duvougrqx";
// cloudinary.config(process.env.CLOUDINARY_URL);


mongoose
  .connect(
    "mongodb+srv://dissojak:stoondissojakb2a@stoon.r8tcyqv.mongodb.net/ARTIFEX?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log("MongoDB connection error:",err);
  });
