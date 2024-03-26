const express = require("express");
const SAC = require("../controller/SavedArtworksController");
const LAC = require("../controller//LikedArtworksController");
const MW = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getLikedArtworks", MW.protect, LAC.getLikedArtworks);
router.get("/getSavedArtworks", MW.protect, SAC.getSavedArtworks);
router.patch("/saveArtwork",MW.protect, SAC.saveArtwork);
router.patch("/likeArtwork",MW.protect, LAC.likeArtwork);

module.exports = router;