const express = require("express");
const MC = require("../controller/MuseumController");
const MPC =require("../controller/MuseumPinnedController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/create",
  MW.protect,
  [
    check("title").trim().notEmpty().withMessage("Title is required"),
    check("description")
      .trim()
      .notEmpty()
      .isLength({ max: 500 })
      .withMessage(
        "Description is required and must be at most 500 characters long"
      ),
    check("numberMaxArtists")
      .isInt({ min: 5 })
      .withMessage("Invalid number of maximum artists"),
    check("numberMaxClients")
      .isInt({ min: 5 })
      .withMessage("Invalid number of maximum clients"),
    check("priceClient")
      .isNumeric()
      .withMessage("Price for clients must be numeric"),
    check("priceArtist")
      .isNumeric()
      .withMessage("Price for artists must be numeric"),
    check("dateStart").isISO8601().withMessage("Invalid start date"),
    check("dateEnd").isISO8601().withMessage("Invalid end date"),
    check("isExclusive")
      .isBoolean()
      .withMessage("isExclusive must be a boolean"),
    check("idCategory").isMongoId().withMessage("Invalid category ID"),
  ],
  MC.createMuseum
);

router.patch(
  "/edit",
  MW.protect,
  [
    check("title").notEmpty().withMessage("Title cannot be empty"),
    check("description").isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),
    check("priceClient").isNumeric().withMessage("Client price must be a positive number"),
    check("priceArtist").isNumeric().withMessage("Artist price must be a positive number"),
    check("dateStart").isISO8601().withMessage("Start date must be a valid date"),
    check("dateEnd").isISO8601().withMessage("End date must be a valid date"),
  ],
  MC.editMuseum
);

router.get("/museums", MW.protect, MC.getMuseums);

router.get("/participantArtists", MW.protect, MC.getParticipantArtists);

router.get("/participantClients", MW.protect, MC.getParticipantClients);

router.post("/artistJoin", MW.protect, MC.artistJoin);

router.post("/clientJoin", MW.protect, MC.clientJoin);

router.post("/addArtworks", MW.protect, MC.addArtworksToMuseum);

router.post("/addExclusiveArtwork", MW.protect,
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
MC.addExclusiveArtwork);

router.get('/byDate',MW.protect, MC.getMuseumsByDates);
router.post('/pin',MW.protect,MPC.pinMuseum); 
router.delete("/unpin",MW.protect,MPC.unPinMuseum);
router.get('/PinnedMuseums',MW.protect,MPC.getPinnedMuseum);

module.exports = router;
