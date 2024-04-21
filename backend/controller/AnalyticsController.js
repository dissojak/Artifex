const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Analytics = require("../models/analytics");
const { checkPlan } = require("./PlanController");

/**
 * @desc    get Artist Analytics
 * @route   POST /api/analytics/getArtistAnalytics
 * @access  Private
 */
exports.getAnalytics = asyncHandler(async (req, res, next) => {
  const artistId = req.user._id;

  //   just for test
  // const artistId = req.params.artistId;

  const analytics = await Analytics.findOne({ artistId });
  if (!analytics) {
    return next(new HttpError("Analytics not found", 404));
  }

  res.status(200).json({
    message: "Analytics retrived successfully",
    analytics,
  });
});

const artistAnalytics = async (artistId) => {
  const analytics = await Analytics.findOne({ artistId });
  if (!analytics) {
    console.log("Analytics not found");
  }
  console.log(analytics);
  return analytics;
};

exports.calculateScore = async (id) => {
  // on the top ( artistAnalytics )
  const analytics = await artistAnalytics(id); // JSON object
  let total;
  if (!analytics) {
    // have 0 reviews : net min 50
    total = 50;
  } else if (
    analytics.numberOfComments === 0 &&
    analytics.ratingAnalytics === 0
  ) {
    //have 1 review created by like or vu only : net min 80
    total =
      analytics.totaleReviews * 60 +
      analytics.likesAnalytics * 30 +
      analytics.viewsAnalytics * 20;
  } else {
     //have reviews : net min 90 [min = 1 review + 1 view + 1 cmnt]
    total =
      analytics.totaleReviews * 50 +
      analytics.ratingAnalytics * 40 +
      analytics.numberOfComments * 30 +
      analytics.likesAnalytics * 20 +
      analytics.viewsAnalytics * 10;
  }

  // check plan controller for checkPlan
  const plan = await checkPlan(id); // String
  let bonus = 0;
  if (plan === "gold") {
    bonus = 20;
  }
  if (plan === "platinum") {
    bonus = 40;
  }
  if (plan === "diamond") {
    bonus = 60;
  }

  console.log("total = ", total);
  const score = total + (total / 100) * bonus;
  console.log("score = ", score);
  return score;
};
