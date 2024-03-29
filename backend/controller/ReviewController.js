const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Review = require("../models/review");
const Analytics = require("../models/analytics");
const ReportReview = require("../models/reportReview");
const mongoose = require("mongoose");

// Add your controller methods here

// ---------- esmaany lenna raw manich 3eref ken les function edhom khaw nest7a9ouhom wela le
// awka chnbda nraka7 wkhaw baaed nzidou nthabtou w nraw na9ess nkhdmou bel controller bel controller,
//  nthabtou fyha lin nt2kdou mich ne9sa chy w kif tkhdem w testy bel POSTMAN ma tensech taamel
//  capturet lel mongoDB w postman w hothom f dousi bech baaed nkhdmou byhom f rapport -------

/**
 * @desc    Get reviews by artwork ID
 * @route   GET /api/review/artwork/:artworkId
 * @access  Private
 */
exports.getReviewsByArtworkId = asyncHandler(async (req, res, next) => {
  const artworkId = req.params.artworkId;

  let reviews;
  try {
    reviews = await Review.find({ artworkId });
  } catch (err) {
    return next(
      new HttpError("Fetching reviews failed, please try again later.", 500)
    );
  }

  if (!reviews || reviews.length === 0) {
    return next(
      new HttpError("Could not find reviews for the provided artwork ID.", 404)
    );
  }

  res.status(200).json({
    reviews: reviews.map((review) => review.toObject({ getters: true })),
  });
});

/**
 * @desc     Add a comment to a review Or Update it
 * @function Update or Add
 * @method   PATCH
 * @route    PATCH /api/review/addComment
 * @params   artistId, artworkId, comment
 * @access   Private
 */
exports.addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }
  const { artistId, artworkId, comment } = req.body;
  const clientId = req.user._id;

  let review;
  let analytics;

  try {
    review = await Review.findOne({ clientId, artworkId });

    // Find or create analytics for the artwork
    analytics = await Analytics.findOne({ artistId });

    if (!analytics) {
      analytics = new Analytics({ artistId });
    }

    /*but this also will never happen cuz when the user even 
    enter to check the artwork , it will automaticly create 
    a review to update the fild view by true , 
    or even when the artist like the artwork before even seeing it,
    that will create a new analytics to update the number of likes*/

    if (!review) {
      // If there is no existing review, create a new one
      review = new Review({
        clientId,
        artworkId,
        comment,
      });
      analytics.totaleReviews += 1;
      analytics.numberOfComments += 1;
    } else {
      if (review.comment === "") {
        analytics.numberOfComments += 1;
      }
      // If the review exists, add or update the comment
      review.comment = comment;
    }

    // Save the review and analytics changes within a session
    const session = await mongoose.startSession();
    session.startTransaction();
    await review.save({ session });
    await analytics.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Failed to add comment", 500));
  }
};

/**
 * @desc     Save the view of Client for an artwork !
 * @function Save Data
 * @method   PATCH
 * @route    PATCH /api/review/updateView
 * @params   artistId, artworkId
 * @access   Private
 */

exports.updateView = async (req, res, next) => {
  const { artistId, artworkId } = req.body;
  const clientId = req.user._id;

  let review;
  let analytics;

  try {
    review = await Review.findOne({ clientId, artworkId });

    // Find or create analytics for the artwork
    analytics = await Analytics.findOne({ artistId });

    if (!analytics) {
      analytics = new Analytics({ artistId });
    }
    if (!review) {
      review = new Review({
        clientId,
        artworkId,
        view: true,
      });
      analytics.totaleReviews += 1;
      analytics.viewsAnalytics += 1;
    } else {
      /*but look this is just for security reasons , otherwise 
    the this else will never excute , cuz the review will never
    be created by putting a rating or a comment , cuz before 
    you ever can do those u need to enter to artwork , and whenever
    you do that as a client , this view function will be called
    and , she will be the first thing that will be create that review.
    ---- 
    also the VIEW filed in review to check if the user view the artwork 
    before or not is usless too , cuz if we create a review , that
    means 100% the user view the artwork so there is no need to 
    even check that !*/
      // and this will never be false too
      if (review.view === false) {
        analytics.viewsAnalytics += 1;
      }
      review.view = true;
    }

    // Save the review and analytics changes within a session
    const session = await mongoose.startSession();
    session.startTransaction();
    await review.save({ session });
    await analytics.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Clinet viewed this artwork ! Saving data done successfully",
    });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Failed to save data", 500));
  }
};

/**
 * @desc     Delete a comment from a review
 * @function Delete
 * @method   DELETE
 * @route    DELETE /api/review/deleteComment
 * @params   artistId, artworkId
 * @access   Private
 * @author   Client
 */
exports.deleteComment = async (req, res, next) => {
  const { artistId, artworkId } = req.body;
  const clientId = req.user._id;

  try {
    const review = await Review.findOne({ clientId, artworkId });
    if (!review) {
      return next(new HttpError("Review not found", 404));
    }
    review.comment = ""; // Remove the comment

    // Update the analytics (for example, decrement the number of comments)
    const analytics = await Analytics.findOneAndUpdate(
      { artistId },
      { $inc: { numberOfComments: -1 } },
      { new: true } // Return the updated analytics document
    );

    // Save the changes within a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    await review.save({ session });
    await analytics.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Failed to delete comment", 500));
  }
};

/** 
 * -------- @Logic ----------------------
 * Implement your logic here
update the analytics
if its just add for new rating , 
just add the rating to analytics
else if its an update you should check the old rating before
updating , delete it from analytics , then update it in reviews 
and analytics again !
ps: new rating should find the default in rating 0
else then that its not new rating its an update
/* 
/**
 * @desc     Add rating to a review
 * @function add or update
 * @method   PATCH
 * @route    PATCH /api/review/addRating
 * @params   artistId, artworkId, newRating
 * @access   Private
 */

exports.addRating = async (req, res, next) => {
  const { artistId, artworkId, newRating } = req.body;
  const clientId = req.user._id;

  try {
    const review = await Review.findOne({ clientId, artworkId });
    if (!review) {
      return next(new HttpError("Review not found", 404));
    }

    // Check if it's a new rating or an update
    if (review.rating === 0) {
      review.rating = newRating;

      const analytics = await Analytics.findOneAndUpdate(
        { artistId },
        { $inc: { ratingAnalytics: newRating } },
        { new: true }
      );

      // Save the changes within a transaction
      const session = await mongoose.startSession();
      session.startTransaction();
      await review.save({ session });
      await analytics.save({ session });
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "Rating added successfully" });
    } else {
      const oldRating = review.rating;

      // Delete the old rating from analytics
      const analytics = await Analytics.findOneAndUpdate(
        { artistId },
        { $inc: { ratingAnalytics: -oldRating } },
        { new: true }
      );

      // Update the rating in the review
      review.rating = newRating;

      // Update the new rating in analytics
      analytics.ratingAnalytics += newRating;

      const session = await mongoose.startSession();
      session.startTransaction();
      await review.save({ session });
      await analytics.save({ session });
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "Rating updated successfully" });
    }
  } catch (err) {
    console.error(err);
    return next(new HttpError("Failed to add or update rating", 500));
  }
};