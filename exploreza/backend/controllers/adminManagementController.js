const Admin = require("../models/Admin");
const { sendWelcomeEmail } = require("../services/emailService");

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select(
      "-password -otpCode -otpExpires"
    );

    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: error.message,
    });
  }
};

// Get admin by ID
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id).select(
      "-password -otpCode -otpExpires"
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin",
      error: error.message,
    });
  }
};

// Create new admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role, loginMethod } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // Create new admin
    const adminData = {
      name,
      email,
      role: role || "admin",
      loginMethod: loginMethod || "password",
    };

    // Add password if loginMethod is password or both
    if (loginMethod === "password" || loginMethod === "both") {
      adminData.password = password;
    }

    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name, password);
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the admin creation if email fails
    }

    // Return admin without sensitive data
    const adminResponse = await Admin.findById(newAdmin._id).select(
      "-password -otpCode -otpExpires"
    );

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: adminResponse,
    });
  } catch (error) {
    console.error("Error creating admin:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create admin",
      error: error.message,
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData.otpCode;
    delete updateData.otpExpires;

    const admin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -otpCode -otpExpires");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update admin",
      error: error.message,
    });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (id === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: error.message,
    });
  }
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
