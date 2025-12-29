const Place = require("../models/Place");
const { deleteFile, getRelativePath } = require("../middleware/upload");

// Helper function to get proper image URL
const getImageUrl = (req, imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL (starts with http:// or https://), return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
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

// @desc    Get all places
// @route   GET /api/places
// @access  Public
const getPlaces = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };

    if (req.query.country) {
      filter.country = new RegExp(req.query.country, "i");
    }

    if (req.query.state) {
      filter.state = new RegExp(req.query.state, "i");
    }

    if (req.query.tripType) {
      // For domestic trips, filter by India
      if (req.query.tripType === "domestic") {
        filter.country = "India";
      } else if (req.query.tripType === "international") {
        filter.country = { $ne: "India" };
      }
    }

    // Build sort object
    let sort = { createdAt: -1 };
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "name_asc":
          sort = { name: 1 };
          break;
        case "name_desc":
          sort = { name: -1 };
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

    const places = await Place.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await Place.countDocuments(filter);

    // Add file URLs
    const placesWithUrls = places.map((place) => {
      const placeObj = place.toObject();
      if (placeObj.image) {
        placeObj.imageUrl = getImageUrl(req, placeObj.image);
      }
      if (placeObj.additionalImages) {
        placeObj.additionalImageUrls = placeObj.additionalImages.map((img) =>
          getImageUrl(req, img)
        );
      }
      return placeObj;
    });

    res.status(200).json({
      success: true,
      count: places.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: placesWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching places",
      error: error.message,
    });
  }
};

// @desc    Get single place
// @route   GET /api/places/:id
// @access  Public
const getPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    const placeObj = place.toObject();

    // Add file URLs
    if (placeObj.image) {
      placeObj.imageUrl = getImageUrl(req, placeObj.image);
    }
    if (placeObj.additionalImages) {
      placeObj.additionalImageUrls = placeObj.additionalImages.map((img) =>
        getImageUrl(req, img)
      );
    }

    res.status(200).json({
      success: true,
      data: placeObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching place",
      error: error.message,
    });
  }
};

// @desc    Create new place
// @route   POST /api/places
// @access  Public (for now)
const createPlace = async (req, res) => {
  try {
    console.log("=== CREATE PLACE DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Request files:", req.files);

    const placeData = { ...req.body };

    // Add file paths if uploaded (store relative paths)
    if (req.file) {
      console.log("Single file uploaded:", req.file);
      placeData[req.file.fieldname] = getRelativePath(req.file.path);
    }

    if (req.files) {
      console.log("Multiple files uploaded:", req.files);
      if (req.files.image) {
        console.log("Main image file:", req.files.image[0]);
        placeData.image = getRelativePath(req.files.image[0].path);
      }
      if (req.files.additionalImages) {
        console.log("Additional images:", req.files.additionalImages);
        placeData.additionalImages = req.files.additionalImages.map((file) =>
          getRelativePath(file.path)
        );
      }
    }

    console.log("Final place data:", placeData);

    // Validate that required fields are present
    if (
      !placeData.name ||
      !placeData.state ||
      !placeData.country ||
      !placeData.duration
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, state, country, duration are required",
      });
    }

    const place = await Place.create(placeData);

    const placeObj = place.toObject();

    // Add file URLs
    if (placeObj.image) {
      placeObj.imageUrl = getImageUrl(req, placeObj.image);
    }
    if (placeObj.additionalImages) {
      placeObj.additionalImageUrls = placeObj.additionalImages.map((img) =>
        getImageUrl(req, img)
      );
    }

    res.status(201).json({
      success: true,
      message: "Place created successfully",
      data: placeObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating place",
      error: error.message,
    });
  }
};

// @desc    Update place
// @route   PUT /api/places/:id
// @access  Public (for now)
const updatePlace = async (req, res) => {
  try {
    let place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    const placeData = { ...req.body };

    // Handle file uploads (store relative paths)
    if (req.file) {
      // Delete old file
      if (place[req.file.fieldname]) {
        deleteFile(place[req.file.fieldname]);
      }
      placeData[req.file.fieldname] = getRelativePath(req.file.path);
    }

    if (req.files) {
      if (req.files.image) {
        if (place.image) {
          deleteFile(place.image);
        }
        placeData.image = getRelativePath(req.files.image[0].path);
      }
      if (req.files.additionalImages) {
        // Delete old additional images
        if (place.additionalImages) {
          place.additionalImages.forEach((img) => deleteFile(img));
        }
        placeData.additionalImages = req.files.additionalImages.map((file) =>
          getRelativePath(file.path)
        );
      }
    }

    place = await Place.findByIdAndUpdate(req.params.id, placeData, {
      new: true,
      runValidators: true,
    });

    const placeObj = place.toObject();

    // Add file URLs
    if (placeObj.image) {
      placeObj.imageUrl = getImageUrl(req, placeObj.image);
    }
    if (placeObj.additionalImages) {
      placeObj.additionalImageUrls = placeObj.additionalImages.map((img) =>
        getImageUrl(req, img)
      );
    }

    res.status(200).json({
      success: true,
      message: "Place updated successfully",
      data: placeObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating place",
      error: error.message,
    });
  }
};

// @desc    Delete place
// @route   DELETE /api/places/:id
// @access  Public (for now)
const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    // Delete associated files
    if (place.image) {
      deleteFile(place.image);
    }
    if (place.additionalImages) {
      place.additionalImages.forEach((img) => deleteFile(img));
    }

    await Place.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Place deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting place",
      error: error.message,
    });
  }
};

// @desc    Get places by country and state
// @route   GET /api/places/by-location
// @access  Public
const getPlacesByLocation = async (req, res) => {
  try {
    const { country, state } = req.query;

    if (!country) {
      return res.status(400).json({
        success: false,
        message: "Country parameter is required",
      });
    }

    const filter = { country: new RegExp(country, "i"), isActive: true };

    if (state) {
      filter.state = new RegExp(state, "i");
    }

    const places = await Place.find(filter)
      .sort({ name: 1 })
      .select("name state country duration image");

    // Add file URLs
    const placesWithUrls = places.map((place) => {
      const placeObj = place.toObject();
      if (placeObj.image) {
        placeObj.imageUrl = getImageUrl(req, placeObj.image);
      }
      return placeObj;
    });

    res.status(200).json({
      success: true,
      count: places.length,
      data: placesWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching places by location",
      error: error.message,
    });
  }
};

module.exports = {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
  getPlacesByLocation,
};

