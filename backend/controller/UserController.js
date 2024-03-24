const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Artwork = require("../models/artwork");
const asyncHandler = require("express-async-handler");
const GT = require("../utils/generateToken.js");

exports.signupAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs , check your data ", 422));
  }
  const { email, username, pw } = req.body;
  const createdAdmin = new User({
    email,
    username: username.toLowerCase(),
    pw,
    userType: "admin",
    banned: false,
  });
  try {
    await createdAdmin.save();
    console.log("Admin saved successfully");
  } catch (e) {
    return next(new HttpError("Creating Admin failed ! ", 500));
  }
  res.status(201).json({
    msg: "Admin has been added successfully !",
    admin: createdAdmin.toObject({ getters: true }),
  });
};

/**
 * @desc    Authenticate user and generate token
 * @route   POST /api/user/auth
 * @access  Public
 */
exports.authUser = asyncHandler(async (req, res, next) => {
  const { username, email, pw } = req.body;
  let user;
  if (username) {
    const name = username.toLowerCase();
    user = await User.findOne({ username: name }).select("+pw");
  } else if (email) {
    console.log(email);
    user = await User.findOne({ email }).select("+pw");
  }

  if (user && (await user.matchPassword(pw))) {
    GT.generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    return next(new HttpError("Invalid (username|email) ,password", 401));
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/user/signup
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { username, email, pw, userType } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new HttpError("User already exists", 400));
  }

  let userData = {
    username: username.toLowerCase(),
    email,
    pw,
    panier: [],
    userType,
    banned: false,
  };

  // Add additional fields based on user type
  if (userType === "artist") {
    userData = {
      ...userData,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
      normalPrice: req.body.normalPrice,
      rapidPrice: req.body.rapidPrice,
      orderStatus: req.body.orderStatus,
    };
  }

  const user = await User.create(userData);

  if (user) {
    GT.generateToken(res, user._id);

    let msg;
    if (userType === "client") {
      msg = "Client has been added successfully !";
    } else if (userType === "artist") {
      msg = "Artist has been added successfully !";
    }
    res.status(201).json({
      msg,
      _id: user._id,
      username: user.username,
      email: user.email,
      userType: user.userType,
    });
  } else {
    return next(new HttpError("Invalid user data", 400));
  }
});

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/user/logout
 * @access  Public
 */
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "Logged out successfully" });
};

/**
 * @desc    Get user profile
 * @route   GET /api/user/getUser
 * @access  Private
 */
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      msg: "User profile",
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt.toLocaleString(),
      updatedAt: user.updatedAt.toLocaleString(),
    });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/user/settings
 * @access  Private
 */
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs , check your data ", 422));
  }

  const { username, email, newPw, oldPw } = req.body;

  // Check if none of the required fields are provided
  if (!username && !email && !newPw) {
    return next(new HttpError("Invalid Data", 400));
  }

  // this to not select pw when updating username or email to not
  // get an error cuz the pw will be >20 , so we just select it when
  // we get pw from the frontend
  let user;
  if (newPw) {
    user = await User.findById(req.user._id).select("+pw");
  } else {
    user = await User.findById(req.user._id);
  }

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;

    /* we still to make verification of last password before updating
     to new password , so we need to get the old password from
     body and verify it with the one in DB before updating to the
     new Password !!! */
    //--------- USE THAT oldPw IN BODY-PARSER ------------

    /*  Check if newPw is provided and oldPw exists to excute the 
      update of password */
    if (newPw && oldPw) {
      // Check if oldPw matches the current password stored in the database
      // Use matchPassword() to crypt the pw to make test successfully
      if (await user.matchPassword(oldPw)) {
        user.pw = newPw;
      } else {
        return next(new HttpError("Invalid old password", 401));
      }
    }

    const updatedUser = await user.save();

    let msg;
    if (username) {
      msg = `username updated successfully to ${username}`;
    } else if (email) {
      msg = `email updated successfully ${email}`;
    }

    res.json({
      msg,
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      password: newPw,
    });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

/**
 * @desc    Get all clients
 * @route   GET /api/user/getClients
 * @access  Private
 */
exports.getClients = asyncHandler(async (req, res, next) => {
  try {
    const clients = await User.find({ userType: "client" });
    if (clients.length > 0) {
      res.json({
        msg: "Clients found",
        clients: clients.map((client) => ({
          _id: client._id,
          username: client.username,
          email: client.email,
        })),
      });
    } else {
      throw new HttpError("No clients found", 404);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Update user profile image
 * @route   PATCH /api/user/update-profile-image
 * @access  Private
 */

exports.update_ProfileImage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return next(new HttpError("Invalid Inputs , check your data ", 422));
    }

    const userId = req.user._id;
    const { imageUrl } = req.body;

    // Update the user's profileImage field in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true } // To get the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Failed to update profile image" });
  }
};

/**
 * @desc    Get panier of user
 * @route   GET /api/user/getPanier
 * @access  Private
 */
exports.getPanier = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Failed to retrieve user panier", 500));
  }

  if (!user) {
    return next(new HttpError("User not found", 404));
  }

  const artworkIds = user.panier;
  let artworks;
  try {
    /*
    select all artworks from the database using their IDs stored 
    in the artworkIds array. This approach, using $in operator 
    in MongoDB, allows you to fetch multiple artworks in a 
    single query based on their IDs. It's an efficient way 
    to retrieve all artworks associated with the user's panier.
    ------------- its like jointure--------------
    */
    artworks = await Artwork.find({ _id: { $in: artworkIds } });
  } catch (error) {
    return next(new HttpError("Failed to retrieve artworks from panier", 500));
  }

  // If no artworks are found for the provided IDs, return an empty array
  if (!artworks || artworks.length === 0) {
    return res.json({ msg: "vide", panier: [] });
  }
  res.json({
    msg: "Artworks retrieved successfully",
    artworks: artworks,
  });
});

/**
 * @desc    add artwork to panier of user
 * @route   POST /api/user/addArtworkToPanier
 * @access  Private
 */
exports.addArtworkToPanier = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const artworkId = req.body.artworkId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError("User not found", 404);
    }

    // Check if artworkId is valid
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }

    // Add artworkId to the user's panier
    user.panier.push(artworkId);
    await user.save();

    res.status(200).json({ message: "Artwork added to panier successfully" });
  } catch (error) {
    next(new HttpError("Failed to add artwork to panier", 500));
  }
});
