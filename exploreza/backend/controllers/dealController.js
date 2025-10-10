const Deal = require("../models/Deal");
const {
  getFileUrl,
  deleteFile,
  getRelativePath,
} = require("../middleware/upload");

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
const getDeals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.country) {
      filter.country = new RegExp(req.query.country, "i");
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice)
        filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice)
        filter.price.$lte = parseFloat(req.query.maxPrice);
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

    const deals = await Deal.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await Deal.countDocuments(filter);

    // Add file URLs
    const dealsWithUrls = deals.map((deal) => {
      const dealObj = deal.toObject();
      if (dealObj.image) {
        dealObj.imageUrl = getFileUrl(req, dealObj.image);
      }
      if (dealObj.additionalImages) {
        dealObj.additionalImageUrls = dealObj.additionalImages.map((img) =>
          getFileUrl(req, img)
        );
      }
      if (dealObj.ctaBgImage) {
        dealObj.ctaBgImageUrl = getFileUrl(req, dealObj.ctaBgImage);
      }
      // Map inclusions to includes for frontend compatibility
      if (dealObj.inclusions && !dealObj.includes) {
        dealObj.includes = dealObj.inclusions;
      }
      return dealObj;
    });

    res.status(200).json({
      success: true,
      count: deals.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: dealsWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching deals",
      error: error.message,
    });
  }
};

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Public
const getDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    const dealObj = deal.toObject();

    // Add file URLs
    if (dealObj.image) {
      dealObj.imageUrl = getFileUrl(req, dealObj.image);
    }
    if (dealObj.additionalImages) {
      dealObj.additionalImageUrls = dealObj.additionalImages.map((img) =>
        getFileUrl(req, img)
      );
    }
    if (dealObj.ctaBgImage) {
      dealObj.ctaBgImageUrl = getFileUrl(req, dealObj.ctaBgImage);
    }
    // Map inclusions to includes for frontend compatibility
    if (dealObj.inclusions && !dealObj.includes) {
      dealObj.includes = dealObj.inclusions;
    }

    res.status(200).json({
      success: true,
      data: dealObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching deal",
      error: error.message,
    });
  }
};

// @desc    Create new deal
// @route   POST /api/deals
// @access  Public (for now)
const createDeal = async (req, res) => {
  try {
    const dealData = { ...req.body };

    // Map includes to inclusions for backend compatibility
    if (dealData.includes && !dealData.inclusions) {
      dealData.inclusions = dealData.includes;
    }

    // Add file paths if uploaded (store relative paths)
    if (req.file) {
      dealData[req.file.fieldname] = getRelativePath(req.file.path);
    }

    if (req.files) {
      if (req.files.image) {
        dealData.image = getRelativePath(req.files.image[0].path);
      }
      if (req.files.additionalImages) {
        dealData.additionalImages = req.files.additionalImages.map((file) =>
          getRelativePath(file.path)
        );
      }
      if (req.files.ctaBgImage) {
        dealData.ctaBgImage = getRelativePath(req.files.ctaBgImage[0].path);
      }
    }

    const deal = await Deal.create(dealData);

    const dealObj = deal.toObject();

    // Add file URLs
    if (dealObj.image) {
      dealObj.imageUrl = getFileUrl(req, dealObj.image);
    }
    if (dealObj.additionalImages) {
      dealObj.additionalImageUrls = dealObj.additionalImages.map((img) =>
        getFileUrl(req, img)
      );
    }
    if (dealObj.ctaBgImage) {
      dealObj.ctaBgImageUrl = getFileUrl(req, dealObj.ctaBgImage);
    }
    // Map inclusions to includes for frontend compatibility
    if (dealObj.inclusions && !dealObj.includes) {
      dealObj.includes = dealObj.inclusions;
    }

    res.status(201).json({
      success: true,
      message: "Deal created successfully",
      data: dealObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating deal",
      error: error.message,
    });
  }
};

// @desc    Update deal
// @route   PUT /api/deals/:id
// @access  Public (for now)
const updateDeal = async (req, res) => {
  try {
    let deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    const dealData = { ...req.body };

    // Map includes to inclusions for backend compatibility
    if (dealData.includes && !dealData.inclusions) {
      dealData.inclusions = dealData.includes;
    }

    // Handle file uploads (store relative paths)
    if (req.file) {
      // Delete old file
      if (deal[req.file.fieldname]) {
        deleteFile(deal[req.file.fieldname]);
      }
      dealData[req.file.fieldname] = getRelativePath(req.file.path);
    }

    if (req.files) {
      if (req.files.image) {
        if (deal.image) {
          deleteFile(deal.image);
        }
        dealData.image = getRelativePath(req.files.image[0].path);
      }
      if (req.files.additionalImages) {
        // Delete old additional images
        if (deal.additionalImages) {
          deal.additionalImages.forEach((img) => deleteFile(img));
        }
        dealData.additionalImages = req.files.additionalImages.map((file) =>
          getRelativePath(file.path)
        );
      }
      if (req.files.ctaBgImage) {
        if (deal.ctaBgImage) {
          deleteFile(deal.ctaBgImage);
        }
        dealData.ctaBgImage = getRelativePath(req.files.ctaBgImage[0].path);
      }
    }

    deal = await Deal.findByIdAndUpdate(req.params.id, dealData, {
      new: true,
      runValidators: true,
    });

    const dealObj = deal.toObject();

    // Add file URLs
    if (dealObj.image) {
      dealObj.imageUrl = getFileUrl(req, dealObj.image);
    }
    if (dealObj.additionalImages) {
      dealObj.additionalImageUrls = dealObj.additionalImages.map((img) =>
        getFileUrl(req, img)
      );
    }
    if (dealObj.ctaBgImage) {
      dealObj.ctaBgImageUrl = getFileUrl(req, dealObj.ctaBgImage);
    }
    // Map inclusions to includes for frontend compatibility
    if (dealObj.inclusions && !dealObj.includes) {
      dealObj.includes = dealObj.inclusions;
    }

    res.status(200).json({
      success: true,
      message: "Deal updated successfully",
      data: dealObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating deal",
      error: error.message,
    });
  }
};

// @desc    Delete deal
// @route   DELETE /api/deals/:id
// @access  Public (for now)
const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    // Delete associated files
    if (deal.image) {
      deleteFile(deal.image);
    }
    if (deal.additionalImages) {
      deal.additionalImages.forEach((img) => deleteFile(img));
    }
    if (deal.ctaBgImage) {
      deleteFile(deal.ctaBgImage);
    }

    await Deal.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting deal",
      error: error.message,
    });
  }
};

// @desc    Get featured deals
// @route   GET /api/deals/featured
// @access  Public
const getFeaturedDeals = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const deals = await Deal.find({ isActive: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(limit);

    const dealsWithUrls = deals.map((deal) => {
      const dealObj = deal.toObject();
      if (dealObj.bigImage) {
        dealObj.bigImageUrl = getFileUrl(req, dealObj.bigImage);
      }
      if (dealObj.image) {
        dealObj.imageUrl = getFileUrl(req, dealObj.image);
      }
      return dealObj;
    });

    res.status(200).json({
      success: true,
      count: deals.length,
      data: dealsWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured deals",
      error: error.message,
    });
  }
};

// @desc    Get deals by category
// @route   GET /api/deals/category/:category
// @access  Public
const getDealsByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const deals = await Deal.find({
      category: req.params.category,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Deal.countDocuments({
      category: req.params.category,
      isActive: true,
    });

    const dealsWithUrls = deals.map((deal) => {
      const dealObj = deal.toObject();
      if (dealObj.bigImage) {
        dealObj.bigImageUrl = getFileUrl(req, dealObj.bigImage);
      }
      if (dealObj.image) {
        dealObj.imageUrl = getFileUrl(req, dealObj.image);
      }
      return dealObj;
    });

    res.status(200).json({
      success: true,
      count: deals.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: dealsWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching deals by category",
      error: error.message,
    });
  }
};

module.exports = {
  getDeals,
  getDeal,
  createDeal,
  updateDeal,
  deleteDeal,
  getFeaturedDeals,
  getDealsByCategory,
};
