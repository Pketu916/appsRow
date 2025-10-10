const TravelDestination = require("../models/TravelDestination");
const Place = require("../models/Place");
const { deleteFile, getRelativePath } = require("../middleware/upload");
const { parseStatesField, parsePlacesField } = require("../utils/dataParser");

// Helper function to get proper image URL
const getImageUrl = (req, imagePath) => {
  if (!imagePath) return null;
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  let normalizedPath = imagePath.replace(/\\/g, "/");
  const uploadsIndex = normalizedPath.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    normalizedPath = normalizedPath.substring(uploadsIndex);
  } else {
    normalizedPath = "/uploads/" + normalizedPath.replace(/^\//, "");
  }
  return baseUrl + normalizedPath;
};

// @desc    Get all travel destinations (public - only active)
// @route   GET /api/travel-destinations
// @access  Public
const getTravelDestinations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object - only active for public API
    const filter = { isActive: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.country) {
      filter.country = new RegExp(req.query.country, "i");
    }

    if (req.query.tripType) {
      filter.tripType = req.query.tripType;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      // For new structure, check all plan prices
      const priceFilter = {};
      if (req.query.minPrice) priceFilter.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) priceFilter.$lte = parseFloat(req.query.maxPrice);

      filter.$or = [
        { price: priceFilter }, // Legacy price field
        { "plans.deluxe.price": priceFilter },
        { "plans.superDeluxe.price": priceFilter },
        { "plans.luxury.price": priceFilter },
      ];
    }

    // Build sort object
    let sort = { createdAt: -1 };
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "price_asc":
          sort = { price: 1 };
          break;
        case "price_desc":
          sort = { price: -1 };
          break;
        case "rating":
          sort = { rating: -1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
        case "oldest":
          sort = { createdAt: 1 };
          break;
      }
    }

    // Text search
    if (req.query.q) {
      filter.$text = { $search: req.query.q };
    }

    const destinations = await TravelDestination.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await TravelDestination.countDocuments(filter);

    // Add file URLs and process data
    const destinationsWithUrls = destinations.map((destination) => {
      const destObj = destination.toObject();

      // Add image URLs
      if (destObj.image) {
        destObj.imageUrl = getImageUrl(req, destObj.image);
      }
      if (destObj.additionalImages) {
        destObj.additionalImageUrls = destObj.additionalImages.map((img) =>
          getImageUrl(req, img)
        );
      }
      if (destObj.ctaBgImage) {
        destObj.ctaBgImageUrl = getImageUrl(req, destObj.ctaBgImage);
      }

      // Places are now simple strings, no image processing needed

      // Map inclusions to includes for frontend compatibility
      if (destObj.inclusions && !destObj.includes) {
        destObj.includes = destObj.inclusions;
      }

      // Set default price from plans if legacy price is not set
      if (!destObj.price && destObj.plans) {
        destObj.price = destObj.plans.deluxe?.price || 0;
      }

      return destObj;
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: destinationsWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching travel destinations",
      error: error.message,
    });
  }
};

// @desc    Get single travel destination
// @route   GET /api/travel-destinations/:id
// @access  Public
const getTravelDestination = async (req, res) => {
  try {
    const destination = await TravelDestination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Travel destination not found",
      });
    }

    const destObj = destination.toObject();

    // Add file URLs
    if (destObj.image) {
      destObj.imageUrl = getImageUrl(req, destObj.image);
    }
    if (destObj.additionalImages) {
      destObj.additionalImageUrls = destObj.additionalImages.map((img) =>
        getImageUrl(req, img)
      );
    }
    if (destObj.ctaBgImage) {
      destObj.ctaBgImageUrl = getImageUrl(req, destObj.ctaBgImage);
    }

    // Add image URLs for places
    if (destObj.places) {
      destObj.places = destObj.places.map((placeData) => {
        if (placeData.place && placeData.place.image) {
          placeData.place.imageUrl = getImageUrl(req, placeData.place.image);
        }
        if (placeData.place && placeData.place.additionalImages) {
          placeData.place.additionalImageUrls =
            placeData.place.additionalImages.map((img) =>
              getImageUrl(req, img)
            );
        }
        return placeData;
      });
    }

    // Map inclusions to includes for frontend compatibility
    if (destObj.inclusions && !destObj.includes) {
      destObj.includes = destObj.inclusions;
    }

    // Set default price from plans if legacy price is not set
    if (!destObj.price && destObj.plans) {
      destObj.price = destObj.plans.deluxe?.price || 0;
    }

    res.status(200).json({
      success: true,
      data: destObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching travel destination",
      error: error.message,
    });
  }
};

// @desc    Create new travel destination
// @route   POST /api/travel-destinations
// @access  Public (for now)
const createTravelDestination = async (req, res) => {
  try {
    console.log("=== CREATE TRAVEL DESTINATION DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Request files:", req.files);

    const destinationData = { ...req.body };

    // Parse JSON strings if they exist
    if (typeof destinationData.plans === "string") {
      try {
        destinationData.plans = JSON.parse(destinationData.plans);
      } catch (error) {
        console.error("Error parsing plans JSON:", error);
      }
    }

    if (typeof destinationData.places === "string") {
      try {
        destinationData.places = JSON.parse(destinationData.places);
      } catch (error) {
        console.error("Error parsing places JSON:", error);
      }
    }

    if (typeof destinationData.highlights === "string") {
      try {
        destinationData.highlights = JSON.parse(destinationData.highlights);
      } catch (error) {
        console.error("Error parsing highlights JSON:", error);
      }
    }

    if (typeof destinationData.inclusions === "string") {
      try {
        destinationData.inclusions = JSON.parse(destinationData.inclusions);
      } catch (error) {
        console.error("Error parsing inclusions JSON:", error);
      }
    }

    if (typeof destinationData.exclusions === "string") {
      try {
        destinationData.exclusions = JSON.parse(destinationData.exclusions);
      } catch (error) {
        console.error("Error parsing exclusions JSON:", error);
      }
    }

    if (typeof destinationData.tags === "string") {
      try {
        destinationData.tags = JSON.parse(destinationData.tags);
      } catch (error) {
        console.error("Error parsing tags JSON:", error);
      }
    }

    // Debug: Log the parsed data
    console.log("Parsed destinationData:", destinationData);
    console.log("Plans data:", destinationData.plans);
    console.log("Places data:", destinationData.places);

    // Map includes to inclusions for backend compatibility
    if (destinationData.includes && !destinationData.inclusions) {
      destinationData.inclusions = destinationData.includes;
    }

    // Process places data - now simple strings
    if (destinationData.places && Array.isArray(destinationData.places)) {
      destinationData.places = destinationData.places.filter(
        (place) => place && place.trim()
      );
    }

    // Parse states field using utility function
    destinationData.states = parseStatesField(destinationData.states);

    // Parse places field using utility function (if not already processed)
    if (!Array.isArray(destinationData.places)) {
      destinationData.places = parsePlacesField(destinationData.places);
    }

    // Add file paths if uploaded (store relative paths)
    if (req.file) {
      console.log("Single file uploaded:", req.file);
      destinationData[req.file.fieldname] = getRelativePath(req.file.path);
    }

    if (req.files) {
      console.log("Multiple files uploaded:", req.files);
      if (req.files.image) {
        console.log("Main image file:", req.files.image[0]);
        destinationData.image = getRelativePath(req.files.image[0].path);
      }
      if (req.files.additionalImages) {
        console.log("Additional images:", req.files.additionalImages);
        destinationData.additionalImages = req.files.additionalImages.map(
          (file) => getRelativePath(file.path)
        );
      }
      if (req.files.ctaBgImage) {
        console.log("CTA background image:", req.files.ctaBgImage[0]);
        destinationData.ctaBgImage = getRelativePath(
          req.files.ctaBgImage[0].path
        );
      }
    }

    console.log("Final destination data:", destinationData);

    // Validate that required fields are present
    if (
      !destinationData.title ||
      !destinationData.country ||
      !destinationData.duration ||
      !destinationData.tripType
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: title, country, duration, tripType are required",
      });
    }

    // Validate plans data
    if (
      !destinationData.plans ||
      !destinationData.plans.deluxe ||
      !destinationData.plans.superDeluxe ||
      !destinationData.plans.luxury
    ) {
      console.log("Plans validation failed:", destinationData.plans);
      return res.status(400).json({
        success: false,
        message: "All three plans (deluxe, superDeluxe, luxury) are required",
      });
    }

    const destination = await TravelDestination.create(destinationData);

    const destObj = destination.toObject();

    // Add file URLs
    if (destObj.image) {
      destObj.imageUrl = getImageUrl(req, destObj.image);
    }
    if (destObj.additionalImages) {
      destObj.additionalImageUrls = destObj.additionalImages.map((img) =>
        getImageUrl(req, img)
      );
    }
    if (destObj.ctaBgImage) {
      destObj.ctaBgImageUrl = getImageUrl(req, destObj.ctaBgImage);
    }
    // Map inclusions to includes for frontend compatibility
    if (destObj.inclusions && !destObj.includes) {
      destObj.includes = destObj.inclusions;
    }

    res.status(201).json({
      success: true,
      message: "Travel destination created successfully",
      data: destObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating travel destination",
      error: error.message,
    });
  }
};

// @desc    Update travel destination
// @route   PUT /api/travel-destinations/:id
// @access  Public (for now)
const updateTravelDestination = async (req, res) => {
  try {
    console.log("=== UPDATE TRAVEL DESTINATION DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Request files:", req.files);

    let destination = await TravelDestination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Travel destination not found",
      });
    }

    const destinationData = { ...req.body };

    // Parse JSON strings if they exist
    if (typeof destinationData.plans === "string") {
      try {
        destinationData.plans = JSON.parse(destinationData.plans);
      } catch (error) {
        console.error("Error parsing plans JSON:", error);
      }
    }

    if (typeof destinationData.places === "string") {
      try {
        destinationData.places = JSON.parse(destinationData.places);
      } catch (error) {
        console.error("Error parsing places JSON:", error);
      }
    }

    if (typeof destinationData.highlights === "string") {
      try {
        destinationData.highlights = JSON.parse(destinationData.highlights);
      } catch (error) {
        console.error("Error parsing highlights JSON:", error);
      }
    }

    if (typeof destinationData.inclusions === "string") {
      try {
        destinationData.inclusions = JSON.parse(destinationData.inclusions);
      } catch (error) {
        console.error("Error parsing inclusions JSON:", error);
      }
    }

    if (typeof destinationData.exclusions === "string") {
      try {
        destinationData.exclusions = JSON.parse(destinationData.exclusions);
      } catch (error) {
        console.error("Error parsing exclusions JSON:", error);
      }
    }

    if (typeof destinationData.tags === "string") {
      try {
        destinationData.tags = JSON.parse(destinationData.tags);
      } catch (error) {
        console.error("Error parsing tags JSON:", error);
      }
    }

    // Debug: Log the parsed data
    console.log("Parsed destinationData:", destinationData);
    console.log("Plans data:", destinationData.plans);
    console.log("Places data:", destinationData.places);

    // Map includes to inclusions for backend compatibility
    if (destinationData.includes && !destinationData.inclusions) {
      destinationData.inclusions = destinationData.includes;
    }

    // Process places data - now simple strings
    if (destinationData.places && Array.isArray(destinationData.places)) {
      destinationData.places = destinationData.places.filter(
        (place) => place && place.trim()
      );
    }

    // Parse states field using utility function
    destinationData.states = parseStatesField(destinationData.states);

    // Parse places field using utility function (if not already processed)
    if (!Array.isArray(destinationData.places)) {
      destinationData.places = parsePlacesField(destinationData.places);
    }

    // Validate plans data for update
    if (destinationData.plans) {
      if (
        !destinationData.plans.deluxe ||
        !destinationData.plans.superDeluxe ||
        !destinationData.plans.luxury
      ) {
        console.log(
          "Plans validation failed in update:",
          destinationData.plans
        );
        return res.status(400).json({
          success: false,
          message: "All three plans (deluxe, superDeluxe, luxury) are required",
        });
      }
    }

    // Handle file uploads (store relative paths)
    if (req.file) {
      // Delete old file
      if (destination[req.file.fieldname]) {
        deleteFile(destination[req.file.fieldname]);
      }
      destinationData[req.file.fieldname] = getRelativePath(req.file.path);
    }

    if (req.files) {
      if (req.files.image) {
        if (destination.image) {
          deleteFile(destination.image);
        }
        destinationData.image = getRelativePath(req.files.image[0].path);
      }
      if (req.files.additionalImages) {
        // Delete old additional images
        if (destination.additionalImages) {
          destination.additionalImages.forEach((img) => deleteFile(img));
        }
        destinationData.additionalImages = req.files.additionalImages.map(
          (file) => getRelativePath(file.path)
        );
      }
      if (req.files.ctaBgImage) {
        if (destination.ctaBgImage) {
          deleteFile(destination.ctaBgImage);
        }
        destinationData.ctaBgImage = getRelativePath(
          req.files.ctaBgImage[0].path
        );
      }
    }

    destination = await TravelDestination.findByIdAndUpdate(
      req.params.id,
      destinationData,
      {
        new: true,
        runValidators: true,
      }
    );

    const destObj = destination.toObject();

    // Add file URLs
    if (destObj.image) {
      destObj.imageUrl = getImageUrl(req, destObj.image);
    }
    if (destObj.additionalImages) {
      destObj.additionalImageUrls = destObj.additionalImages.map((img) =>
        getImageUrl(req, img)
      );
    }
    if (destObj.ctaBgImage) {
      destObj.ctaBgImageUrl = getImageUrl(req, destObj.ctaBgImage);
    }
    // Map inclusions to includes for frontend compatibility
    if (destObj.inclusions && !destObj.includes) {
      destObj.includes = destObj.inclusions;
    }

    res.status(200).json({
      success: true,
      message: "Travel destination updated successfully",
      data: destObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating travel destination",
      error: error.message,
    });
  }
};

// @desc    Delete travel destination
// @route   DELETE /api/travel-destinations/:id
// @access  Public (for now)
const deleteTravelDestination = async (req, res) => {
  try {
    const destination = await TravelDestination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Travel destination not found",
      });
    }

    // Delete associated files
    if (destination.image) {
      deleteFile(destination.image);
    }
    if (destination.additionalImages) {
      destination.additionalImages.forEach((img) => deleteFile(img));
    }
    if (destination.ctaBgImage) {
      deleteFile(destination.ctaBgImage);
    }

    await TravelDestination.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Travel destination deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting travel destination",
      error: error.message,
    });
  }
};

// @desc    Get featured travel destinations
// @route   GET /api/travel-destinations/featured
// @access  Public
const getFeaturedTravelDestinations = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const destinations = await TravelDestination.find({
      isActive: true,
      isFeatured: true,
    })
      .populate("places.place", "name state country duration image")
      .sort({ createdAt: -1 })
      .limit(limit);

    const destinationsWithUrls = destinations.map((destination) => {
      const destObj = destination.toObject();

      // Add image URLs
      if (destObj.image) {
        destObj.imageUrl = getImageUrl(req, destObj.image);
      }
      if (destObj.additionalImages) {
        destObj.additionalImageUrls = destObj.additionalImages.map((img) =>
          getImageUrl(req, img)
        );
      }
      if (destObj.ctaBgImage) {
        destObj.ctaBgImageUrl = getImageUrl(req, destObj.ctaBgImage);
      }

      // Places are now simple strings, no image processing needed

      // Set default price from plans if legacy price is not set
      if (!destObj.price && destObj.plans) {
        destObj.price = destObj.plans.deluxe?.price || 0;
      }

      return destObj;
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinationsWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured travel destinations",
      error: error.message,
    });
  }
};

// @desc    Get all travel destinations for admin (all data)
// @route   GET /api/travel-destinations/admin
// @access  Admin
const getTravelDestinationsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object - no isActive filter for admin
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.country) {
      filter.country = new RegExp(req.query.country, "i");
    }

    if (req.query.tripType) {
      filter.tripType = req.query.tripType;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      // For new structure, check all plan prices
      const priceFilter = {};
      if (req.query.minPrice) priceFilter.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) priceFilter.$lte = parseFloat(req.query.maxPrice);

      filter.$or = [
        { price: priceFilter }, // Legacy price field
        { "plans.deluxe.price": priceFilter },
        { "plans.superDeluxe.price": priceFilter },
        { "plans.luxury.price": priceFilter },
      ];
    }

    // Build sort object
    let sort = { createdAt: -1 };
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "price_asc":
          sort = { price: 1 };
          break;
        case "price_desc":
          sort = { price: -1 };
          break;
        case "rating":
          sort = { rating: -1 };
          break;
        case "newest":
          sort = { createdAt: -1 };
          break;
        case "oldest":
          sort = { createdAt: 1 };
          break;
      }
    }

    // Text search
    if (req.query.q) {
      filter.$text = { $search: req.query.q };
    }

    const destinations = await TravelDestination.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await TravelDestination.countDocuments(filter);

    // Add file URLs
    const destinationsWithUrls = destinations.map((destination) => {
      const destObj = destination.toObject();

      // Add image URLs
      if (destObj.image) {
        destObj.imageUrl = getImageUrl(req, destObj.image);
      }
      if (destObj.additionalImages) {
        destObj.additionalImageUrls = destObj.additionalImages.map((img) =>
          getImageUrl(req, img)
        );
      }
      if (destObj.ctaBgImage) {
        destObj.ctaBgImageUrl = getImageUrl(req, destObj.ctaBgImage);
      }

      // Places are now simple strings, no image processing needed

      // Map inclusions to includes for frontend compatibility
      if (destObj.inclusions && !destObj.includes) {
        destObj.includes = destObj.inclusions;
      }

      // Set default price from plans if legacy price is not set
      if (!destObj.price && destObj.plans) {
        destObj.price = destObj.plans.deluxe?.price || 0;
      }

      return destObj;
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: destinationsWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching travel destinations for admin",
      error: error.message,
    });
  }
};

module.exports = {
  getTravelDestinations,
  getTravelDestinationsAdmin,
  getTravelDestination,
  createTravelDestination,
  updateTravelDestination,
  deleteTravelDestination,
  getFeaturedTravelDestinations,
};
