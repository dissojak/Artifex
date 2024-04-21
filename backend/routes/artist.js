const express = require("express");
const AC = require("../controller/ArtistController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.put(
  "/openOrder",
  MW.protect,
  [
    check("normalPrice")
      .notEmpty()
      .withMessage("Normal price cannot be empty")
      .isNumeric()
      .withMessage("Normal price must be a number"),
    check("rapidPrice")
      .notEmpty()
      .withMessage("Rapid price cannot be empty")
      .isNumeric()
      .withMessage("Rapid price must be a number"),
  ],
  AC.openOrder
);
router.patch("/socialMedia", MW.protect, AC.socialMedia);

module.exports = router;
