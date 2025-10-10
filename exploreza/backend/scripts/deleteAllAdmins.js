const mongoose = require("mongoose");
const Admin = require("../models/Admin");
require("dotenv").config({ path: "./config.env" });

async function deleteAllAdmins() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get all admins
    const admins = await Admin.find({});
    console.log(`Found ${admins.length} admins:`);

    admins.forEach((admin, index) => {
      console.log(
        `${index + 1}. ${admin.name} (${admin.email}) - ${admin.role}`
      );
    });

    if (admins.length === 0) {
      console.log("No admins found to delete");
      return;
    }

    // Delete all admins
    const result = await Admin.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} admins successfully!`);
  } catch (error) {
    console.error("❌ Error deleting admins:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

// Run the function
deleteAllAdmins();
