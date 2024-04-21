const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Plan = require("../models/plan");
const User = require("../models/user");

/**
 * @desc    subscribe to plan
 * @route   POST /api/plan/subscribe
 * @params  planType
 * @access  Private
 */
exports.subscribe = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { planType } = req.body;
  const artistId = req.user._id;

  try {
    // Check if the artist has any active subscriptions
    const activeSubscription = await Plan.findOne({
      artistId,
      dateEnd: { $gt: new Date() }, // Check if the end date is in the future
    });

    if (activeSubscription) {
      return res
        .status(400)
        .json({ message: "Artist already has an active subscription" });
    }

    const dateStart = new Date();
    const dateEnd = new Date(dateStart);
    dateEnd.setDate(dateEnd.getDate() + 30);

    const plan = new Plan({
      planType,
      dateStart,
      dateEnd,
      artistId,
    });

    await plan.save();

    res.status(201).json({ message: "Plan subscribed successfully", plan });
  } catch (error) {
    return next(new HttpError("Failed to subscribe to the plan", 500));
  }
});

/**
 * @desc    get all plans available
 * @route   GET /api/plan/plans
 * @access  Private
 * @author  Admin
 */
exports.getPlans = asyncHandler(async (req, res, next) => {
  const adminId = req.user._id;

  const admin = await User.findById(adminId);
  if (!admin) {
    return next(new HttpError("User not found", 404));
  }

  if (admin.userType != "admin") {
    return next(new HttpError("you are not an admin", 400));
  }

  const plans = await Plan.find();

  if (!plans || plans.length === 0) {
    return res.status(404).json({ message: "No plans found for this artist" });
  }

  res.status(200).json({
    message: "Plans retrieved successfully",
    plans,
  });
});

/**
 * @desc    get all history plans of an artist available
 * @route   GET /api/plan/history
 * @access  Private
 */
exports.getHistorique = asyncHandler(async (req, res, next) => {
  const artistId = req.user._id;

  try {
    const plans = await Plan.find({ artistId });

    if (!plans || plans.length === 0) {
      return res
        .status(404)
        .json({ message: "No plans found for this artist" });
    }

    res.status(200).json({
      message: "historique of plans retrieved successfully",
      plans,
    });
  } catch (error) {
    return next(
      new HttpError("Failed to retrieve plans history for this artist", 500)
    );
  }
});

/**
 * @desc    get active current plan of an artist
 * @route   GET /api/plan/activePlan
 * @access  Private
 */
exports.getActivePlan = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }
  const artistId = req.user._id;

  let isSubscribed = true;

  // Check if the artist has any active subscriptions
  const activePlan = await Plan.findOne({
    artistId,
    dateEnd: { $gt: new Date() },
  });
  if (!activePlan) {
    isSubscribed = flase;
  }

  res.status(200).json({
    message: "historique of plans retrieved successfully",
    isSubscribed,
    activePlan,
  });
});

exports.checkPlan=async (artistId) =>{
  let activePlan;

    activePlan = await Plan.findOne({
      artistId,
      dateEnd: { $gt: new Date() },
    });

    if(!activePlan){
      return "normal";
    }
  console.log("plan is : ",activePlan.planType);
  return activePlan.planType;
}
