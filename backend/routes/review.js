const express = require("express");
const router = express.Router();
const RC = require("../controller/ReviewController");

// Get reviews by artwork ID
router.get("/artwork/:artworkId", RC.getReviewsByArtworkId);

// Add a comment to a review
router.post("/addcomment/:reviewId", RC.addComment);

// Update a comment in a review
router.patch("/updatecomment/:reviewId/:commentId", RC.updateComment);

// Delete a comment from a review
router.delete("/deletecomment/:reviewId/:commentId", RC.deleteComment);

// Add rating to a review
router.post("/addrating/:reviewId", RC.addRating);

// Update rating in a review
router.patch("/updaterating/:reviewId", RC.updateRating);

// Delete a review
router.delete("/deletereview/:reviewId", RC.deleteReview);

// Update view count in a review
router.patch("/updateview/:reviewId", RC.updateView);

// Report a review
router.post("/report/:reviewId", RC.reportReview);

// Get reported reviews
router.get("/reported", RC.getReportedReviews);

module.exports = router;
