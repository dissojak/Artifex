const express = require("express");
const PC = require("../controller/PlanController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/subscribe",
  [
    check("planType")
      .isIn(["gold", "platinum", "diamond"])
      .withMessage("Plan type must be one of: gold, platinum, diamond"),
  ],
  MW.protect,
  PC.subscribe
);

router.get("/plans", MW.protect, PC.getPlans);
router.get("/history", MW.protect, PC.getHistorique);
router.get("/activePlan", MW.protect, PC.getActivePlan);

module.exports = router;
