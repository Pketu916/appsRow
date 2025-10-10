const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const { sendWelcomeEmail } = require("../services/emailService");
require("dotenv").config({ path: "./config.env" });

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Admin data
    const adminData = {
      name: "Super Admin",
      email: "admin@exploreza.com",
      password: "admin123",
      loginMethod: "both", // Both password and OTP
      role: "super_admin",
      isActive: true,
      permissions: {
        canManagePlaces: true,
        canManageDestinations: true,
        canManageDeals: true,
        canViewEnquiries: true,
        canManageAdmins: true,
      },
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin with this email already exists");
      console.log("Admin details:", {
        id: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role,
        isActive: existingAdmin.isActive,
        loginMethod: existingAdmin.loginMethod,
      });
      return;
    }

    // Create new admin
    const admin = new Admin(adminData);
    await admin.save();

    console.log("Admin created successfully!");
    console.log("Admin details:", {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
      loginMethod: admin.loginMethod,
    });

    // Send welcome email if email service is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      console.log("Sending welcome email...");
      const emailResult = await sendWelcomeEmail(
        admin.email,
        admin.name,
        adminData.password
      );

      if (emailResult.success) {
        console.log("Welcome email sent successfully");
      } else {
        console.log("Failed to send welcome email:", emailResult.error);
      }
    } else {
      console.log(
        "Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD in config.env"
      );
      console.log("Admin credentials:");
      console.log(`Email: ${admin.email}`);
      console.log(`Password: ${adminData.password}`);
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

// Run the script
createAdmin();
