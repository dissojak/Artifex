const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const ReportArtwork = require("../models/reportArtwork");
const ReportReview = require("../models/reportReview");
const Review = require("../models/review");
const Artwork = require("../models/artwork");

/**
 * @desc     Get reported reviews
 * @method   get
 * @route    GET /api/report/review/reports
 * @access   Private
 */
exports.getReportedReviews = asyncHandler(async (req, res, next) => {
  try {
    const reports = await ReportReview.find();
    if (!reports || reports.length === 0) {
      return res.json({
        msg: "vide",
        reports: [],
      });
    }
    res.json({
      msg: "reports retrieved successfully",
      reports,
    });
  } catch (err) {
    return next(new HttpError(`Failed to get reports , ${err}`, 500));
  }
});

/**
 * @desc     Get reported artworks
 * @method   get
 * @route    GET /api/report/artwork/reports
 * @access   Private
 */
exports.getReportedArtworks = asyncHandler(async (req, res, next) => {
  try {
    const reports = await ReportArtwork.find();
    if (!reports || reports.length === 0) {
      return res.json({
        msg: "vide",
        reports: [],
      });
    }
    res.json({
      msg: "reports retrieved successfully",
      reports,
    });
  } catch (err) {
    return next(new HttpError(`Failed to get reports , ${err}`, 500));
  }
});

/**
 * @desc     Get reported reviews by class of report
 * @method   get
 * @route    GET /api/report/getReviewsReportsByClass
 * @params   class
 * @access   Private
 */
exports.getReportedReviewsByClass = asyncHandler(async (req, res, next) => {
  const reportClass = req.body.class;
  try {
    const reports = await ReportReview.find({ reportClass });
    if (!reports || reports.length === 0) {
      return res.json({
        msg: "vide",
        reports: [],
      });
    }
    res.json({
      msg: `reports of class:'${reportClass}' retrieved successfully`,
      reports,
    });
  } catch (err) {
    return next(new HttpError(`Failed to get reports , ${err}`, 500));
  }
});

/**
 * @desc     Get reported artworks by class of report
 * @method   get
 * @route    GET /api/report/getArtworksReportsByClass
 * @params   class
 * @access   Private
 */
exports.getReportedArtworksByClass = asyncHandler(async (req, res, next) => {
  const reportClass = req.body.class;
  try {
    const reports = await ReportArtwork.find({ reportClass });
    if (!reports || reports.length === 0) {
      return res.json({
        msg: "vide",
        reports: [],
      });
    }
    res.json({
      msg: `reports of class:'${reportClass}' retrieved successfully`,
      reports,
    });
  } catch (err) {
    return next(new HttpError(`Failed to get reports , ${err}`, 500));
  }
});

/**
 * @desc     Report a comment in review
 * @method   post
 * @route    POST /api/report/reportComment
 * @params   reportClass, reportedClientId, artworkId
 * @access   Private
 */
exports.reportComment = async (req, res, next) => {
  const { reportClass, clientId, artworkId } = req.body;
  const reportingClientId = req.user._id;

  try {
    const review = await Review.findOne({
      clientId,
      artworkId,
    });

    if (!review) {
      return next(new HttpError("Review not found", 404));
    }

    const existingReport = await ReportReview.findOne({
      reportClass,
      clientId: reportingClientId,
      ReviewId: review._id,
    });

    if (existingReport) {
      res
        .status(201)
        .json({ message: "Your repport is already saved on our servers." });
    } else {
      // Create a new report
      const report = new ReportReview({
        reportClass,
        clientId: reportingClientId, //here clientId is the person who reported
        ReviewId: review._id,
      });

      // Save the report to the database
      await report.save();

      res.status(201).json({ message: "Review reported successfully" });
    }
  } catch (err) {
    return next(new HttpError(`Failed to report this comment , ${err}`, 500));
  }
};

/**
 * @desc     Report an artwork
 * @method   post
 * @route    POST /api/report/reportArtwork
 * @params   reportClass, artworkId
 * @access   Private
 */
exports.reportArtwork = async (req, res, next) => {
  const { reportClass, artworkId } = req.body;
  const reportingClientId = req.user._id;

  try {
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return next(new HttpError("artwork not found", 404));
    }

    const existingReport = await ReportArtwork.findOne({
      reportClass,
      clientId: reportingClientId,
      artworkId: artwork._id,
    });

    if (existingReport) {
      res.status(201).json({ message: "Your report has already been saved." });
    } else {
      // Create a new report
      const report = new ReportArtwork({
        reportClass,
        clientId: reportingClientId, //here clientId is the person who reported
        artworkId: artwork._id,
      });

      // Save the report to the database
      await report.save();

      res.status(201).json({ message: "Artwork reported successfully" });
    }
  } catch (err) {
    return next(
      new HttpError(`Failed to report the artwork: ${err.message}`, 500)
    );
  }
};
