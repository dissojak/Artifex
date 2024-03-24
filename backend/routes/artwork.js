const express = require("express");
const AWC = require("../controller/ArtworkController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
    "/AddArtwork",
    [
      check("title").isLength({ min: 2 }).withMessage("Title must be at least 2 characters long"),
      check("description").isLength({ min: 10, max: 100 }).withMessage("Description must be between 10 and 100 characters long"),
      check("price").isNumeric().withMessage("Price must be a number"),
      check("ImageArtwork").isURL().withMessage("ImageArtwork must be a valid URL"),
      check("id_category").notEmpty().withMessage("Category ID must be a valid MongoDB ID"),
    ],
    MW.protect,
    AWC.addArtwork
  );

router.get("/getArtwork/:id",MW.protect,AWC.getArtwork);

module.exports = router;
