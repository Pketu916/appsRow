const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TravelDestination = require("../models/TravelDestination");
const Deal = require("../models/Deal");
const Place = require("../models/Place");
const Enquiry = require("../models/Enquiry");

// Mock admin user (in production, this should be in database)
const ADMIN_USER = {
  id: "admin-001",
  email: "admin@Rajkamal.com",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
  name: "Admin User",
  role: "admin",
  createdAt: new Date(),
};

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists and password matches
    if (email === ADMIN_USER.email) {
      const isPasswordValid = await bcrypt.compare(
        password,
        ADMIN_USER.password
      );

      if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign(
          {
            userId: ADMIN_USER.id,
            email: ADMIN_USER.email,
            role: ADMIN_USER.role,
          },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "24h" }
        );

        // Return success response
        return res.status(200).json({
          success: true,
          message: "Login successful",
          data: {
            user: {
              id: ADMIN_USER.id,
              email: ADMIN_USER.email,
              name: ADMIN_USER.name,
              role: ADMIN_USER.role,
            },
            token,
          },
        });
      }
    }

    // Invalid credentials
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get current admin user
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (decoded.userId === ADMIN_USER.id) {
      return res.status(200).json({
        success: true,
        data: {
          user: {
            id: ADMIN_USER.id,
            email: ADMIN_USER.email,
            name: ADMIN_USER.name,
            role: ADMIN_USER.role,
          },
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  } catch (error) {
    console.error("Get admin user error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

// Update admin profile
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (decoded.userId === ADMIN_USER.id) {
      const { name, email } = req.body;

      // Update admin user (in production, update in database)
      if (name) ADMIN_USER.name = name;
      if (email) ADMIN_USER.email = email;

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: {
          user: {
            id: ADMIN_USER.id,
            email: ADMIN_USER.email,
            name: ADMIN_USER.name,
            role: ADMIN_USER.role,
          },
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  } catch (error) {
    console.error("Update admin profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Change password
router.put("/change-password", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (decoded.userId === ADMIN_USER.id) {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password and new password are required",
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        ADMIN_USER.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      ADMIN_USER.password = hashedNewPassword;

      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Dashboard stats
router.get("/dashboard/stats", async (req, res) => {
  try {
    // Get counts from all collections
    const [destinations, deals, places, enquiries] = await Promise.all([
      TravelDestination.countDocuments(),
      Deal.countDocuments(),
      Place.countDocuments(),
      Enquiry.countDocuments(),
    ]);

    // Get recent activities
    const recentDestinations = await TravelDestination.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name createdAt");

    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name createdAt");

    // Format activities
    const activities = [];

    recentDestinations.forEach((dest) => {
      activities.push({
        type: "destination",
        message: `New destination '${dest.name}' added`,
        timestamp: dest.createdAt,
      });
    });

    recentEnquiries.forEach((enquiry) => {
      activities.push({
        type: "enquiry",
        message: `New enquiry from ${enquiry.name}`,
        timestamp: enquiry.createdAt,
      });
    });

    // Sort activities by timestamp
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json({
      success: true,
      destinations,
      deals,
      places,
      enquiries,
      activities: activities.slice(0, 5), // Return only 5 most recent
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
});

// Logout (client-side token removal)
router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
