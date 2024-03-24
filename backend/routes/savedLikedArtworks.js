const express = require("express");
const SAC = require("../controller/SavedArtworksController");
const LAC = require("../controller//LikedArtworksController");
const MW = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getLikedArtworks", MW.protect, LAC.getLikedArtworks);
router.get("/getSavedArtworks", MW.protect, SAC.getSavedArtworks);
router.post("/saveArtwork",MW.protect, SAC.SaveArtwork);

module.exports = router;