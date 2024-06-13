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
      .isLength({ min: 10, max: 400 })
      .withMessage("Description must be between 10 and 400 characters long"),
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

router.post(
  "/signup/AddArtwork",
  [
    check("title")
      .isLength({ min: 2, max: 25 })
      .withMessage("Title must be at least 2 characters long"),
    check("description")
      .isLength({ min: 10, max: 400 })
      .withMessage("Description must be between 10 and 400 characters long"),
    check("price").isNumeric().withMessage("Price must be a number"),
    check("imageArtwork")
      .isURL()
      .withMessage("ImageArtwork must be a valid URL"),
    check("id_category")
      .notEmpty()
      .withMessage("Category ID must be a valid MongoDB ID"),
  ],
  MW.protect,
  AWC.addArtworkSignup
);

router.put(
  "/editArtwork/:artworkId",
  (req, res, next) => {
    if (req.body.title) {
      check("title")
        .isLength({ min: 2, max: 25 })
        .withMessage("Title must be at least 2 characters long");
    }
    if (req.body.description) {
      check("description")
        .isLength({ min: 10, max: 400 })
        .withMessage("Description must be between 10 and 400 characters long");
    }
    next();
  },
  MW.protect,
  AWC.editArtwork
);

router.get("/getArtworks", AWC.getArtworks);
router.get("/getArtworksForAdmin", AWC.getArtworksForAdmin);
router.get("/getExclusiveArtworks", MW.protect, AWC.getExclusiveArtworks);
router.delete(
  "/deleteArtworkByAdmin/:artworkId",
  MW.protect,
  AWC.deleteArtworkByAdmin
);
router.put("/private", MW.protect, AWC.makePrivate);
router.put("/public", MW.protect, AWC.makePublic);
router.get("/visibility/:artworkId", MW.protect, AWC.checkVisibility);
router.delete("/deleteArtwork", MW.protect, AWC.deleteArtwork);
router.post("/getArtworksByArtistId", MW.protect, AWC.getArtworksByArtistId);
router.get("/getArtworksByCategory", MW.protect, AWC.getArtworksByCategory);
router.get("/getBoughtArtwork", MW.protect, AWC.getBoughtArtwork);

router.post("/buyArtwork", MW.protect, AWC.buyArtwork);
router.post("/artworkPayment", MW.protect, AWC.artworkPayment);

router.get("/getArtwork/:artworkId", MW.protect, AWC.getArtwork);

router.put("/approveArtwork", MW.protect, AWC.approveArtwork);
router.put("/declineArtwork", MW.protect, AWC.declineArtwork);

module.exports = router;
