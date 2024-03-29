const express = require("express");
const SAC = require("../controller/SavedArtworksController");
const LAC = require("../controller//LikedArtworksController");
const MW = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getLikedArtworks", MW.protect, LAC.getLikedArtworks);
router.get("/getSavedArtworks", MW.protect, SAC.getSavedArtworks);
router.post("/saveArtwork",MW.protect, SAC.saveArtwork);
router.post("/likeArtwork",MW.protect, LAC.likeArtwork);
router.delete("/unsaveArtwork",MW.protect, SAC.unsaveArtwork);
router.delete("/unlikeArtwork",MW.protect, LAC.unlikeArtwork);


module.exports = router;