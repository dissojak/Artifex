const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Review = require("../models/review");
const Artwork = require("../models/artwork");
const Analytics = require("../models/analytics");
const ReportReview = require("../models/reportReview");

// Add your controller methods here

// ---------- esmaany lenna raw manich 3eref ken les function edhom khaw nest7a9ouhom wela le
// awka chnbda nraka7 wkhaw baaed nzidou nthabtou w nraw na9ess nkhdmou bel controller bel controller,
//  nthabtou fyha lin nt2kdou mich ne9sa chy w kif tkhdem w testy bel POSTMAN ma tensech taamel
//  capturet lel mongoDB w postman w hothom f dousi bech baaed nkhdmou byhom f rapport -------

// Get reviews by artwork ID
exports.getReviewsByArtworkId = async (req, res, next) => {
  // Implement your logic here
};

// Add a comment to a review
exports.addComment = async (req, res, next) => {
  // Implement your logic here
  //   update the analytics
};

// Update a review
exports.updateComment = async (req, res, next) => {
  // Implement your logic here
  // when you ... , update the analytics
};

// Delete a comment from a review
exports.deleteComment = async (req, res, next) => {
  // Implement your logic here
  //   update the analytics
};

// Add rating to a review
exports.addRating = async (req, res, next) => {
  // Implement your logic here
  //   update the analytics
};

// Update rating in a review
exports.updateRating = async (req, res, next) => {
  // Implement your logic here
  // when you update rating, update the analytics
};

// Delete a review
exports.deleteReview = async (req, res, next) => {
  // Implement your logic here
  // when you delete review , update the analytics
};

// Update view count in a review
exports.updateView = async (req, res, next) => {
  // Implement your logic here
  //   update the analytics
};

// Report a review
exports.reportReview = async (req, res, next) => {
  // Implement your logic here
};

// Get reported reviews
exports.getReportedReviews = async (req, res, next) => {
  // Implement your logic here
};
