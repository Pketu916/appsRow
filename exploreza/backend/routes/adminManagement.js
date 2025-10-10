const express = require("express");
const router = express.Router();
const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById,
} = require("../controllers/adminManagementController");
const { authenticateAdmin, requireRole } = require("../middleware/adminAuth");
const { validateAdmin } = require("../middleware/validation");

// All routes require admin authentication
router.use(authenticateAdmin);

// Get all admins (only super_admin can access)
router.get("/", requireRole(["super_admin"]), getAllAdmins);

// Get admin by ID (only super_admin can access)
router.get("/:id", requireRole(["super_admin"]), getAdminById);

// Create new admin (only super_admin can access)
router.post("/", requireRole(["super_admin"]), validateAdmin, createAdmin);

// Update admin (only super_admin can access)
router.put("/:id", requireRole(["super_admin"]), validateAdmin, updateAdmin);

// Delete admin (only super_admin can access)
router.delete("/:id", requireRole(["super_admin"]), deleteAdmin);

module.exports = router;
