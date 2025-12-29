const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const Deal = require("../models/Deal");
const TravelDestination = require("../models/TravelDestination");
const Place = require("../models/Place");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for clearing...");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    // Clear all data
    await Deal.deleteMany({});
    console.log("Cleared all deals...");

    await TravelDestination.deleteMany({});
    console.log("Cleared all travel destinations...");

    await Place.deleteMany({});
    console.log("Cleared all places...");

    console.log("✅ Database cleared successfully!");
  } catch (error) {
    console.error("Clearing error:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

// Run clearing
connectDB().then(() => {
  clearDatabase();
});
