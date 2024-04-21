const express = require("express");
const OC = require("../controller/OrderController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/new",
  [
    check("description")
      .isLength({ max: 50 })
      .withMessage("Description must be less than 50 characters"),
    check("serviceType")
      .isIn(["rapid", "normal"])
      .withMessage("Service type must be 'rapid' or 'normal'"),
  ],
  MW.protect,
  OC.makeOrder
);

router.put("/reject", MW.protect, OC.rejectOrder);
router.put("/accept", MW.protect, OC.acceptOrder);


router.patch(
  "/submit",
  [check("date_live").isDate().withMessage("date entred is not a valid date")],
  MW.protect,
  OC.submitOrder
);

// just for testing
router.get("/find",MW.protect,OC.findOrder);

router.get("/list",OC.list);

module.exports = router;
