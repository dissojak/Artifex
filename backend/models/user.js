const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Username field
    username: {
      type: String,
      required: true, // Username is required
      unique: true, // Username must be unique
      minlength: [2, "Username must be at least 2 characters long"], // Minimum length of username
      maxlength: [14, "Username cannot be longer than 14 characters"], // Maximum length of username
    },
    // Email field
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
    },
    // Password field
    pw: {
      type: String,
      required: true, // Password is required
      minlength: [3, "Password must be at least 3 characters long"], // Minimum length of password
      maxlength: [40, "Password cannot be longer than 40 characters"], // Maximum length of password
      select: false,
    },
    // User type field
    userType: {
      type: String,
      enum: ["admin", "client", "artist"], // User type can only be one of these values
      default: "client", // Default user type is 'client'
    },
    // Badge field
    badge: {
      type: String, // Badge field is optional (its SVG of the badge depends on the role "admin" or plan)
    },
    // Profile image field
    profileImage: {
      type: String,
    },
    // Banned field
    banned: {
      type: Boolean,
      default: false, // Default to false, meaning the user is not banned
    },
    // Phone number field
    phone_number: {
      type: String, // Phone number of the user
      // Additional validation for phone number format can be added here if necessary
    },
    // Instagram username field
    instagram: {
      type: String, // Instagram username of the user
    },
    // Twitter username field
    twitter: {
      type: String, // Twitter username of the user
    },
    // LinkedIn username field
    linkedin: {
      type: String, // LinkedIn username of the user
    },
    // Facebook username field
    facebook: {
      type: String, // Facebook username of the user
    },
    // Panier list field (shopping cart)
    panier: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Artwork", // Assuming 'Artwork' is the name of the related model for items in the shopping cart
      },
    ],
    // Artist Plan ID referencing the Plan model
    CurrentPlan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan", // Assuming 'Plan' is the name of the related model
    },
    //for artist order
    normalPrice: {
      type: Number,
    },
    // Price for rapid service
    rapidPrice: {
      type: Number,
    },
    // this define if the order option for this artist is open or not !
    orderStatus: {
      type: Boolean,
      default: false,
    },
    // Creation timestamp
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current timestamp when the user is created
    },
    // Last update timestamp
    updatedAt: {
      type: Date,
      default: Date.now, // Default to the current timestamp when the user is created or updated
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.pw);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (this.isModified("pw")) {
    const salt = await bcrypt.genSalt(10);
    this.pw = await bcrypt.hash(this.pw, salt);
    // Update the updatedAt field whenever the password is modified
    this.updatedAt = Date.now(); // Set updatedAt to the current timestamp
  }
  // Update the updatedAt field if username or email is modified
  if (this.isModified("username") || this.isModified("email")) {
    this.updatedAt = Date.now(); // Set updatedAt to the current timestamp
  }
  next();
});

// Apply the unique validator plugin to the schema
userSchema.plugin(uniqueValidator);

// Creating the User model from the schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
module.exports = User;
