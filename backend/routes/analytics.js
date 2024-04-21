const express = require("express");
const ANC = require("../controller/AnalyticsController");
const MW = require("../middleware/authMiddleware");
const router = express.Router();

// just for test
// router.get('/getArtistAnalytics/:artistId', MW.protect,ANC.getAnalytics);

router.get('/getArtistAnalytics', MW.protect,ANC.getAnalytics);

module.exports = router;
