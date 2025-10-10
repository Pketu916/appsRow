const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../services/emailService");
const { validationResult } = require("express-validator");

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "7d",
  });
};

// Admin login with email and password
const loginWithPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message:
          "Your account has been deactivated. Please contact administrator.",
      });
    }

    // Check if admin has password login enabled
    if (admin.loginMethod !== "password" && admin.loginMethod !== "both") {
      return res.status(401).json({
        success: false,
        message: "Password login is not enabled for this account",
      });
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    // Remove sensitive data
    const adminData = admin.toJSON();

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        admin: adminData,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Send OTP for login
const sendLoginOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found with this email",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message:
          "Your account has been deactivated. Please contact administrator.",
      });
    }

    // Check if admin has OTP login enabled
    if (admin.loginMethod !== "otp" && admin.loginMethod !== "both") {
      return res.status(401).json({
        success: false,
        message: "OTP login is not enabled for this account",
      });
    }

    // Generate OTP
    const otp = admin.generateOTP();
    await admin.save();

    // Send OTP via email
    const emailResult = await sendOTPEmail(admin.email, otp, admin.name);

    if (!emailResult.success) {
      console.error("Failed to send OTP email:", emailResult.error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Verify OTP and login
const verifyOTPAndLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const { email, otp } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found with this email",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message:
          "Your account has been deactivated. Please contact administrator.",
      });
    }

    // Verify OTP
    const isOTPValid = admin.verifyOTP(otp);
    if (!isOTPValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Clear OTP after successful verification
    admin.clearOTP();
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    // Remove sensitive data
    const adminData = admin.toJSON();

    res.status(200).json({
      success: true,
      message: "OTP verification successful",
      data: {
        admin: adminData,
        token,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get current admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        admin: admin.toJSON(),
      },
    });
  } catch (error) {
    console.error("Get admin profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Logout (optional - for token blacklisting if needed)
const logout = async (req, res) => {
  try {
    // In a simple implementation, logout is handled on client side
    // For more security, you might want to implement token blacklisting
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  loginWithPassword,
  sendLoginOTP,
  verifyOTPAndLogin,
  getAdminProfile,
  logout,
};
