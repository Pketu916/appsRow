const mongoose = require("mongoose");
const Deal = require("../models/Deal");
const TravelDestination = require("../models/TravelDestination");
require("dotenv").config({ path: "../config.env" });

// Mock request object for testing
const mockRequest = {
  protocol: "http",
  get: (header) => {
    if (header === "host") return "localhost:5000";
    return null;
  },
};

// Helper function to get file URL (from upload middleware)
const getFileUrl = (req, filePath) => {
  if (!filePath) return null;

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Handle different path formats
  let relativePath;
  if (filePath.includes("\\")) {
    // Windows path format
    relativePath = filePath.replace(/\\/g, "/");
  } else {
    // Unix path format
    relativePath = filePath;
  }

  // Extract only the uploads part of the path
  const uploadsIndex = relativePath.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    relativePath = relativePath.substring(uploadsIndex);
  } else {
    // If uploads not found, assume it's already relative
    relativePath = relativePath.startsWith("/")
      ? relativePath
      : "/" + relativePath;
  }

  return baseUrl + relativePath;
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

// Test Deal image URLs
const testDealImageUrls = async () => {
  try {
    console.log("\n=== Testing Deal Image URLs ===");

    const deals = await Deal.find({}).limit(3);

    if (deals.length === 0) {
      console.log("No deals found in database");
      return;
    }

    deals.forEach((deal, index) => {
      console.log(`\nDeal ${index + 1} (ID: ${deal._id}):`);
      console.log(`Title: ${deal.title || "N/A"}`);

      if (deal.image) {
        console.log(`Image path: ${deal.image}`);
        const imageUrl = getFileUrl(mockRequest, deal.image);
        console.log(`Generated URL: ${imageUrl}`);
      } else {
        console.log("No image found");
      }

      if (deal.additionalImages && deal.additionalImages.length > 0) {
        console.log(`Additional images (${deal.additionalImages.length}):`);
        deal.additionalImages.forEach((img, imgIndex) => {
          console.log(`  ${imgIndex + 1}. Path: ${img}`);
          console.log(`     URL: ${getFileUrl(mockRequest, img)}`);
        });
      }

      if (deal.ctaBgImage) {
        console.log(`CTA Background path: ${deal.ctaBgImage}`);
        console.log(
          `CTA Background URL: ${getFileUrl(mockRequest, deal.ctaBgImage)}`
        );
      }
    });
  } catch (error) {
    console.error("Error testing Deal image URLs:", error);
  }
};

// Test TravelDestination image URLs
const testTravelDestinationImageUrls = async () => {
  try {
    console.log("\n=== Testing TravelDestination Image URLs ===");

    const destinations = await TravelDestination.find({}).limit(3);

    if (destinations.length === 0) {
      console.log("No travel destinations found in database");
      return;
    }

    destinations.forEach((destination, index) => {
      console.log(`\nTravelDestination ${index + 1} (ID: ${destination._id}):`);
      console.log(`Title: ${destination.title || "N/A"}`);

      if (destination.image) {
        console.log(`Image path: ${destination.image}`);
        const imageUrl = getFileUrl(mockRequest, destination.image);
        console.log(`Generated URL: ${imageUrl}`);
      } else {
        console.log("No image found");
      }

      if (
        destination.additionalImages &&
        destination.additionalImages.length > 0
      ) {
        console.log(
          `Additional images (${destination.additionalImages.length}):`
        );
        destination.additionalImages.forEach((img, imgIndex) => {
          console.log(`  ${imgIndex + 1}. Path: ${img}`);
          console.log(`     URL: ${getFileUrl(mockRequest, img)}`);
        });
      }

      if (destination.ctaBgImage) {
        console.log(`CTA Background path: ${destination.ctaBgImage}`);
        console.log(
          `CTA Background URL: ${getFileUrl(
            mockRequest,
            destination.ctaBgImage
          )}`
        );
      }
    });
  } catch (error) {
    console.error("Error testing TravelDestination image URLs:", error);
  }
};

// Check for problematic paths
const checkProblematicPaths = async () => {
  try {
    console.log("\n=== Checking for Problematic Paths ===");

    // Check deals with absolute paths
    const dealsWithAbsolutePaths = await Deal.find({
      $or: [
        { image: { $regex: /^C:\\/ } },
        { additionalImages: { $regex: /^C:\\/ } },
        { ctaBgImage: { $regex: /^C:\\/ } },
      ],
    });

    console.log(`Deals with absolute paths: ${dealsWithAbsolutePaths.length}`);

    // Check travel destinations with absolute paths
    const destinationsWithAbsolutePaths = await TravelDestination.find({
      $or: [
        { image: { $regex: /^C:\\/ } },
        { additionalImages: { $regex: /^C:\\/ } },
        { ctaBgImage: { $regex: /^C:\\/ } },
      ],
    });

    console.log(
      `Travel destinations with absolute paths: ${destinationsWithAbsolutePaths.length}`
    );

    if (
      dealsWithAbsolutePaths.length > 0 ||
      destinationsWithAbsolutePaths.length > 0
    ) {
      console.log("\n⚠️  WARNING: Found records with absolute paths!");
      console.log('Run "npm run migrate-paths" to fix these paths.');
    } else {
      console.log("✅ All paths are relative - no migration needed.");
    }
  } catch (error) {
    console.error("Error checking problematic paths:", error);
  }
};

// Main test function
const runTests = async () => {
  try {
    await connectDB();

    console.log("Starting image URL tests...");

    await checkProblematicPaths();
    await testDealImageUrls();
    await testTravelDestinationImageUrls();

    console.log("\n=== Test Summary ===");
    console.log("✅ Image URL generation tests completed");
    console.log("Check the URLs above to ensure they are properly formatted");
  } catch (error) {
    console.error("Tests failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\nDatabase connection closed.");
    process.exit(0);
  }
};

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
