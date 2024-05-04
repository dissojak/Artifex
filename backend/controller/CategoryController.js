const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

exports.getCategories = asyncHandler(async (req, res, next) => {
  let category;
  try {
    category = await Category.find();
  } catch (err) {
    return next(new HttpError("Categories not found", 404));
  }
  res.json({
    msg: "Category retrived successfully",
    category,
  });
});

exports.getCategoryName = async (id) => {
  let category;
  category = await Category.findById(id);
  if (!category) {
    return "unfound";
  }
  return category.name;
};

/**
 * @desc    Add new category
 * @route   POST /api/categories
 * @params  category
 * @access  Private
 */
exports.addCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid data", 400));
  }

  const { category: name } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next(new HttpError("Category already exists", 422));
    }

    const newCategory = new Category({
      name,
    });
    const category = await newCategory.save();

    res.json({
      msg: "Category added successfully",
      category,
    });
  } catch (error) {
    next(new HttpError(error.message || "Failed to add category", 500));
  }
});

/**
 * @desc    Get category name by ID
 * @param   {string} categoryId - The ID of the category
 * @returns {string} The name of the category
 * @callback {Function}
 * @access Super Admin
 */
exports.getCategoryNameById = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new HttpError("Category not found", 404);
    }
    return category.name;
  } catch (error) {
    throw new HttpError(
      error.message || "Failed to retrieve category name",
      500
    );
  }
};

exports.isCategoryExist = async (id) => {
  try {
    const category = await Category.findById(id);
    return !!category; // Returns true if category exists, false otherwise
  } catch (error) {
    // Handle error if any
    console.error("Error checking category existence:", error);
    throw new Error("Failed to check category existence");
  }
};
