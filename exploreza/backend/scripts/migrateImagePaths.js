const mongoose = require("mongoose");
const Deal = require("../models/Deal");
const TravelDestination = require("../models/TravelDestination");
require("dotenv").config({ path: "../config.env" });

// Helper function to convert absolute path to relative path
const getRelativePath = (absolutePath) => {
  if (!absolutePath) return null;

  // Convert Windows backslashes to forward slashes
  const normalizedPath = absolutePath.replace(/\\/g, "/");

  // Find the uploads directory in the path
  const uploadsIndex = normalizedPath.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    return normalizedPath.substring(uploadsIndex);
  }

  // If uploads not found, return the path as is
  return normalizedPath;
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Migrate Deal image paths
const migrateDealPaths = async () => {
  try {
    console.log("Starting Deal image paths migration...");

    const deals = await Deal.find({});
    let updatedCount = 0;

    for (const deal of deals) {
      let needsUpdate = false;
      const updateData = {};

      // Check and update main image
      if (deal.image && deal.image.includes("C:\\")) {
        updateData.image = getRelativePath(deal.image);
        needsUpdate = true;
        console.log(`Deal ${deal._id}: Converting image path`);
      }

      // Check and update additional images
      if (deal.additionalImages && deal.additionalImages.length > 0) {
        const newAdditionalImages = deal.additionalImages.map((img) => {
          if (img && img.includes("C:\\")) {
            return getRelativePath(img);
          }
          return img;
        });

        if (
          JSON.stringify(newAdditionalImages) !==
          JSON.stringify(deal.additionalImages)
        ) {
          updateData.additionalImages = newAdditionalImages;
          needsUpdate = true;
          console.log(`Deal ${deal._id}: Converting additional images paths`);
        }
      }

      // Check and update CTA background image
      if (deal.ctaBgImage && deal.ctaBgImage.includes("C:\\")) {
        updateData.ctaBgImage = getRelativePath(deal.ctaBgImage);
        needsUpdate = true;
        console.log(`Deal ${deal._id}: Converting CTA background image path`);
      }

      if (needsUpdate) {
        await Deal.findByIdAndUpdate(deal._id, updateData);
        updatedCount++;
      }
    }

    console.log(`Deal migration completed. Updated ${updatedCount} deals.`);
  } catch (error) {
    console.error("Error migrating Deal paths:", error);
  }
};

// Migrate TravelDestination image paths
const migrateTravelDestinationPaths = async () => {
  try {
    console.log("Starting TravelDestination image paths migration...");

    const destinations = await TravelDestination.find({});
    let updatedCount = 0;

    for (const destination of destinations) {
      let needsUpdate = false;
      const updateData = {};

      // Check and update main image
      if (destination.image && destination.image.includes("C:\\")) {
        updateData.image = getRelativePath(destination.image);
        needsUpdate = true;
        console.log(
          `TravelDestination ${destination._id}: Converting image path`
        );
      }

      // Check and update additional images
      if (
        destination.additionalImages &&
        destination.additionalImages.length > 0
      ) {
        const newAdditionalImages = destination.additionalImages.map((img) => {
          if (img && img.includes("C:\\")) {
            return getRelativePath(img);
          }
          return img;
        });

        if (
          JSON.stringify(newAdditionalImages) !==
          JSON.stringify(destination.additionalImages)
        ) {
          updateData.additionalImages = newAdditionalImages;
          needsUpdate = true;
          console.log(
            `TravelDestination ${destination._id}: Converting additional images paths`
          );
        }
      }

      // Check and update CTA background image
      if (destination.ctaBgImage && destination.ctaBgImage.includes("C:\\")) {
        updateData.ctaBgImage = getRelativePath(destination.ctaBgImage);
        needsUpdate = true;
        console.log(
          `TravelDestination ${destination._id}: Converting CTA background image path`
        );
      }

      if (needsUpdate) {
        await TravelDestination.findByIdAndUpdate(destination._id, updateData);
        updatedCount++;
      }
    }

    console.log(
      `TravelDestination migration completed. Updated ${updatedCount} destinations.`
    );
  } catch (error) {
    console.error("Error migrating TravelDestination paths:", error);
  }
};

// Main migration function
const runMigration = async () => {
  try {
    await connectDB();

    console.log("Starting image paths migration...");
    console.log(
      "This will convert absolute Windows paths to relative paths in the database."
    );

    await migrateDealPaths();
    await migrateTravelDestinationPaths();

    console.log("Migration completed successfully!");
    console.log("All image paths have been converted to relative paths.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  }
};

// Run migration if this script is executed directly
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration, getRelativePath };
