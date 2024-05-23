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
 * @params  username,email,pw(password)
 * @access  Public
 */
exports.authUser = asyncHandler(async (req, res, next) => {
  const { login, pw } = req.body;
  let user;

  if (login.includes("@")) {
    user = await User.findOne({ email: login }).select("+pw");
  } else {
    const name = login.toLowerCase();
    user = await User.findOne({ username: name }).select("+pw");
  }

  if (user && (await user.matchPassword(pw))) {
    GT.generateToken(res, user._id);
    console.log(user);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image:user.profileImage,
      orderStatus:user.orderStatus,
      banned:user.banned,
      userType:user.userType,
    });
  } else {
    return next(new HttpError("Invalid (username|email) ,password", 401));
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/user/signup
 * @params  username,email,pw(password),userType,phone_number
 *          instagram,facebook,twitter,linked (optional)
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { username, email, pw, userType, phone_number } = req.body;

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
      numberOfFollowers: 0,
      phone_number,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
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
    res.json({ user });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });

  if (user) {
    res.status(200).json({
      msg: "Successfully",
      user,
    });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

/**
 * @desc    Update user profile
 * @route   PUT /api/user/settings
 * @params  username || email || newPw(new password) && oldPw(old password)
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
 * @params  imageUrl
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
 * @returns {
 *            msg: "...",
 *            artworks:[
 *                      {artwork:{artist}},
 *                      {artwork:{artist}},
 *                      ...
 *                      ]
 *          }
 */
exports.getPanier = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate({
      path: "panier",
      populate: { path: "id_artist" }, // Populate the 'artist' field in each artwork
    });

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const artworks = user.panier;
    if (!artworks || artworks.length === 0) {
      return res.json({ msg: "vide", artworks: [] });
    }

    res.json({
      msg: "Artworks retrieved successfully",
      artworks,
    });
  } catch (error) {
    return next(new HttpError("Failed to retrieve user panier", 500));
  }
});

/**
 * @desc    add artwork to panier of user
 * @route   POST /api/user/addArtworkToPanier
 * @param   artworkId
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

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      throw new HttpError("Artwork not found", 404);
    }

    if (user.panier.includes(artworkId)) {
      res.status(409).json({ message: "Artwork already in panier" });
      return;
    }

    user.panier.push(artworkId);
    await user.save();

    res.status(200).json({ message: "Artwork added to panier successfully" });
  } catch (error) {
    next(new HttpError("Failed to add artwork to panier", 500));
  }
});


/**
 * @desc    delete artwork to panier of user
 * @route   DELETE /api/user/removeArtworkFromPanier
 * @param   artworkId
 * @access  Private
 */
exports.removeArtworkFromPanier = asyncHandler(async (req, res, next) => {
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

    // Check if the artwork is already in the user's panier
    const index = user.panier.indexOf(artworkId);
    if (index === -1) {
      res.status(404).json({ message: "Artwork not found in panier" });
      return;
    }

    // Remove artworkId from the user's panier
    user.panier.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Artwork removed from panier successfully" });
  } catch (error) {
    next(new HttpError("Failed to remove artwork from panier", 500));
  }
});


exports.checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking username:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};