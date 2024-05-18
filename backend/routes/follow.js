const express = require("express");
const FC = require("../controller/FollowController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post("/isFollowing",MW.protect,FC.isFollowing);
router.put("/followArtist",MW.protect,FC.followArtist);
router.delete("/unfollowArtist",MW.protect,FC.unfollowArtist);
router.get("/followers/:id",MW.protect,FC.getFollowers);
router.get("/followedArtists",MW.protect,FC.getFollowedArtists);
router.delete("/removeFollower/:clientId",MW.protect,FC.removeFollower);


module.exports = router;
