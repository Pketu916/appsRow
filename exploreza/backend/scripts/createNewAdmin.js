const mongoose = require("mongoose");
const Admin = require("../models/Admin");
require("dotenv").config({ path: "./config.env" });

async function createNewAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "pketu916@gmail.com" });
    if (existingAdmin) {
      console.log("Admin with email pketu916@gmail.com already exists");
      console.log("Admin details:", {
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role,
        isActive: existingAdmin.isActive,
      });
      return;
    }

    // Create new admin
    const adminData = {
      name: "Ketu Patel",
      email: "pketu916@gmail.com",
      password: "Ketu@123",
      role: "admin",
      loginMethod: "password",
      isActive: true,
      permissions: {
        canManagePlaces: true,
        canManageDestinations: true,
        canManageDeals: true,
        canViewEnquiries: true,
        canManageAdmins: false,
      },
    };

    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    console.log("✅ New admin created successfully!");
    console.log("Admin details:", {
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      loginMethod: newAdmin.loginMethod,
      isActive: newAdmin.isActive,
    });

    // Test password
    const isValidPassword = await newAdmin.comparePassword("Ketu@123");
    console.log(
      "Password validation test:",
      isValidPassword ? "✅ Valid" : "❌ Invalid"
    );
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

// Run the function
createNewAdmin();
