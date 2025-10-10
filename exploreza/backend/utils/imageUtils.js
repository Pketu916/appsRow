const path = require("path");

// Helper function to get proper image URL
const getImageUrl = (req, imagePath) => {
  if (!imagePath) return null;

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Normalize the path
  let normalizedPath = imagePath.replace(/\\/g, "/");

  // Extract only the uploads part
  const uploadsIndex = normalizedPath.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    normalizedPath = normalizedPath.substring(uploadsIndex);
  } else {
    // If it doesn't contain /uploads/, add it
    if (!normalizedPath.startsWith("/uploads/")) {
      normalizedPath = "/uploads/" + normalizedPath.replace(/^\//, "");
    }
  }

  return baseUrl + normalizedPath;
};

// Helper function to process image paths in destination data
const processDestinationImages = (req, destination) => {
  if (!destination) return destination;

  const processed = { ...destination };

  // Process main image
  if (processed.image) {
    processed.imageUrl = getImageUrl(req, processed.image);
  }

  // Process additional images
  if (processed.additionalImages && Array.isArray(processed.additionalImages)) {
    processed.additionalImageUrls = processed.additionalImages.map((img) =>
      getImageUrl(req, img)
    );
  }

  // Process CTA background image
  if (processed.ctaBgImage) {
    processed.ctaBgImageUrl = getImageUrl(req, processed.ctaBgImage);
  }

  return processed;
};

// Helper function to process multiple destinations
const processDestinationsImages = (req, destinations) => {
  if (!destinations || !Array.isArray(destinations)) return destinations;

  return destinations.map((destination) =>
    processDestinationImages(req, destination)
  );
};

module.exports = {
  getImageUrl,
  processDestinationImages,
  processDestinationsImages,
};
