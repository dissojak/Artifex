const express = require("express");
const AWC = require("../controller/ArtworkController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/AddArtwork",
  [
    check("title")
      .isLength({ min: 2, max: 15 })
      .withMessage("Title must be at least 2 characters long"),
    check("description")
      .isLength({ min: 10, max: 100 })
      .withMessage("Description must be between 10 and 100 characters long"),
    check("price").isNumeric().withMessage("Price must be a number"),
    check("imageArtwork")
      .isURL()
      .withMessage("ImageArtwork must be a valid URL"),
    check("id_category")
      .notEmpty()
      .withMessage("Category ID must be a valid MongoDB ID"),
  ],
  MW.protect,
  AWC.addArtwork
);

router.put(
  "/editArtwork/:artworkId",
  (req, res, next) => {
    if (req.body.title) {
      check("title")
        .isLength({ min: 2, max: 15 })
        .withMessage("Title must be at least 2 characters long");
    }
    if (req.body.description) {
      check("description")
        .isLength({ min: 10, max: 100 })
        .withMessage("Description must be between 10 and 100 characters long");
    }
    next();
  },
  MW.protect,
  AWC.editArtwork
);

router.get("/getArtworks", MW.protect, AWC.getArtworks);
router.get("/getExclusiveArtworks", MW.protect, AWC.getExclusiveArtworks);
router.delete(
  "/deleteArtworkByAdmin/:artworkId",
  MW.protect,
  AWC.deleteArtworkByAdmin
);
router.delete("/deleteArtwork/:artworkId", MW.protect, AWC.deleteArtwork);
router.get("/getArtworksByArtistId",MW.protect, AWC.getArtworksByArtistId)
router.get("/getArtworksByCategory",MW.protect, AWC.getArtworksByCategory)


module.exports = router;
