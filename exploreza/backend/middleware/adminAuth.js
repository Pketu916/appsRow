const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Verify JWT token and authenticate admin
const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Check if token starts with 'Bearer '
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Find admin by ID from token
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Admin not found.",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Account is deactivated.",
      });
    }

    // Add admin info to request object
    req.admin = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    } else {
      console.error("Authentication error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
};

// Check if admin has specific role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const adminRoles = Array.isArray(roles) ? roles : [roles];

    if (!adminRoles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

// Check specific permission
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Super admin has all permissions
    if (req.admin.role === "super_admin") {
      return next();
    }

    // Check specific permission
    if (!req.admin.permissions || !req.admin.permissions[permission]) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Permission required: ${permission}`,
      });
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      req.admin = null;
      return next();
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      req.admin = null;
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const admin = await Admin.findById(decoded.adminId);

    if (admin && admin.isActive) {
      req.admin = {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
      };
    } else {
      req.admin = null;
    }

    next();
  } catch (error) {
    // If token is invalid, just set admin to null and continue
    req.admin = null;
    next();
  }
};

module.exports = {
  authenticateAdmin,
  requireRole,
  requirePermission,
  optionalAuth,
};
