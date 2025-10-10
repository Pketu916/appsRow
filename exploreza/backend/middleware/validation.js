const { body, param, query, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }

  next();
};

// Deal validation rules
const validateDeal = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),

  body("country").notEmpty().withMessage("Country is required").trim(),

  body("duration").notEmpty().withMessage("Duration is required").trim(),

  body("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("reviews")
    .isInt({ min: 0 })
    .withMessage("Reviews count must be a non-negative integer"),

  body("category")
    .optional()
    .isIn([
      "Honeymoon trip",
      "Family trip",
      "Adventure",
      "Adventure trip",
      "Business trip",
      "Solo trip",
      "Group trip",
      "Hiking and trekking",
      "Beach Holiday",
    ])
    .withMessage("Invalid category"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("oldPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Old price must be a positive number"),

  body("currency").optional().isIn(["INR"]).withMessage("Currency must be INR"),

  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("maxGuests")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Maximum guests must be at least 1"),

  body("minGuests")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Minimum guests must be at least 1"),

  handleValidationErrors,
];

// MongoDB ObjectId validation
const validateObjectId = (paramName) => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName} ID`),

  handleValidationErrors,
];

// Query validation for pagination
const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  handleValidationErrors,
];

// Search query validation
const validateSearch = [
  query("q")
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters")
    .trim(),

  query("category")
    .optional()
    .isIn([
      "Honeymoon trip",
      "Family trip",
      "Adventure",
      "Adventure trip",
      "Business trip",
      "Solo trip",
      "Group trip",
      "Hiking and trekking",
      "Beach Holiday",
    ])
    .withMessage("Invalid category"),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a positive number"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a positive number"),

  query("country")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Country name cannot exceed 50 characters")
    .trim(),

  handleValidationErrors,
];

// Admin validation rules
const validateAdmin = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["super_admin", "admin", "moderator"])
    .withMessage("Role must be super_admin, admin, or moderator"),

  body("loginMethod")
    .optional()
    .isIn(["password", "otp", "both"])
    .withMessage("Login method must be password, otp, or both"),

  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateDeal,
  validateObjectId,
  validatePagination,
  validateSearch,
  validateAdmin,
};
