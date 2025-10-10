const mongoose = require("mongoose");
const Admin = require("../models/Admin");
require("dotenv").config({ path: "./config.env" });

async function updateAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find admin by email
    const admin = await Admin.findOne({ email: "pketu916@gmail.com" });
    if (!admin) {
      console.log("❌ Admin with email pketu916@gmail.com not found");
      return;
    }

    console.log("Found admin:", {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
    });

    // Update admin details
    admin.name = "Ketu Patel";
    admin.password = "Ketu@123";
    admin.role = "admin";
    admin.loginMethod = "password";
    admin.isActive = true;

    await admin.save();

    console.log("✅ Admin updated successfully!");
    console.log("Updated admin details:", {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      loginMethod: admin.loginMethod,
      isActive: admin.isActive,
    });

    // Test password
    const isValidPassword = await admin.comparePassword("Ketu@123");
    console.log(
      "Password validation test:",
      isValidPassword ? "✅ Valid" : "❌ Invalid"
    );
  } catch (error) {
    console.error("❌ Error updating admin:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

// Run the function
updateAdmin();
