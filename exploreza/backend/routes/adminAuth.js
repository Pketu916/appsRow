const express = require("express");
const { body } = require("express-validator");
const {
  loginWithPassword,
  sendLoginOTP,
  verifyOTPAndLogin,
  getAdminProfile,
  logout,
} = require("../controllers/adminAuthController");
const { authenticateAdmin } = require("../middleware/adminAuth");

const router = express.Router();

// Validation middleware
const validateEmail = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Please provide a valid email address");

const validatePassword = body("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long");

const validateOTP = body("otp")
  .isLength({ min: 6, max: 6 })
  .isNumeric()
  .withMessage("OTP must be a 6-digit number");

// Login with email and password
router.post("/login", [validateEmail, validatePassword], loginWithPassword);

// Send OTP for login
router.post("/send-otp", [validateEmail], sendLoginOTP);

// Verify OTP and login
router.post("/verify-otp", [validateEmail, validateOTP], verifyOTPAndLogin);

// Get admin profile (protected route)
router.get("/profile", authenticateAdmin, getAdminProfile);

// Logout
router.post("/logout", authenticateAdmin, logout);

// Test route to check authentication
router.get("/test", authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    admin: req.admin,
  });
});

module.exports = router;
