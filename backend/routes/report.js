const express = require("express");
const RPC = require("../controller/ReportController");
const MW = require("../middleware/authMiddleware");
const router = express.Router();

// Get reported reviews by class
router.get("/getReviewsReportsByClass", MW.protect, RPC.getReportedReviewsByClass);
router.get("/getArtworksReportsByClass", MW.protect, RPC.getReportedArtworksByClass);
router.get("/review/reports", MW.protect, RPC.getReportedReviews);
router.get("/artwork/reports", MW.protect, RPC.getReportedArtworks);
router.post("/reportComment", MW.protect, RPC.reportComment);
router.post("/reportArtwork", MW.protect, RPC.reportArtwork);
module.exports = router;
