const express = require("express");
const CC = require("../controller/CategoryController");
const MW = require("../middleware/authMiddleware");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/addCategory",
  check("category").notEmpty().withMessage("put a valid category name"),
  MW.protect,
  CC.addCategory
);

router.get("/getCategories", CC.getCategories);

module.exports = router;
