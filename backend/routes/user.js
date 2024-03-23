const express = require("express");
const UC = require("../controller/UserController");
const { check } = require("express-validator");
const MW= require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/signupUser",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("pw").isLength({ min: 3 }),
  ],
  UC.signupUser
);

router.post("/signup", UC.registerUser);
router.post("/login", UC.authUser);
router.post("/logout", UC.logoutUser);

router.get("/getUser", MW.protect, UC.getUserProfile);
router.put("/settings", MW.protect, UC.updateUserProfile);

module.exports = router;
