const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

// GET all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enquiries",
      error: error.message,
    });
  }
});

// POST new enquiry
router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const savedEnquiry = await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: savedEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating enquiry",
      error: error.message,
    });
  }
});

// PUT update enquiry status
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry status updated successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating enquiry status",
      error: error.message,
    });
  }
});

// PUT update enquiry
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: Date.now() };

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry updated successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating enquiry",
      error: error.message,
    });
  }
});

// DELETE enquiry
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting enquiry",
      error: error.message,
    });
  }
});

// GET enquiry by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enquiry",
      error: error.message,
    });
  }
});

// GET enquiries by status
router.get("/status/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const enquiries = await Enquiry.find({ status }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enquiries by status",
      error: error.message,
    });
  }
});

// GET recent enquiries
router.get("/recent/:limit", async (req, res) => {
  try {
    const { limit } = req.params;
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: enquiries,
      count: enquiries.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recent enquiries",
      error: error.message,
    });
  }
});

module.exports = router;
