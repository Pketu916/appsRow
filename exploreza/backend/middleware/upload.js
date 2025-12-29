const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = uploadsDir;

    // Determine resource type from URL path
    const urlPath = req.originalUrl || req.path;
    let resourceFolder = "general"; // default folder

    if (urlPath.includes("/travel-destinations")) {
      resourceFolder = "travel-destinations";
    } else if (urlPath.includes("/deals")) {
      resourceFolder = "deals";
    } else if (urlPath.includes("/places")) {
      resourceFolder = "places";
    }

    // Create subdirectories based on resource and file type
    if (file.fieldname === "bigImage" || file.fieldname === "image") {
      uploadPath = path.join(uploadsDir, resourceFolder);
    } else if (file.fieldname === "additionalImages") {
      uploadPath = path.join(uploadsDir, resourceFolder, "additional");
    } else if (file.fieldname === "ctaBgImage") {
      uploadPath = path.join(uploadsDir, resourceFolder, "cta");
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

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

// File filter
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, JPG, PNG, GIF, WEBP) are allowed!"));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
    files: 10, // Maximum 10 files
  },
  fileFilter: fileFilter,
});

// Middleware for single image upload
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadSingleFile = upload.single(fieldName);

    uploadSingleFile(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size too large. Maximum size is 10MB.",
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            message: "Too many files. Maximum 10 files allowed.",
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  };
};

// Middleware for multiple images upload
const uploadMultiple = (fieldName, maxCount = 5) => {
  return (req, res, next) => {
    const uploadMultipleFiles = upload.array(fieldName, maxCount);

    uploadMultipleFiles(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size too large. Maximum size is 10MB.",
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            message: `Too many files. Maximum ${maxCount} files allowed.`,
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  };
};

// Middleware for mixed uploads (single + multiple)
const uploadMixed = (fields) => {
  return (req, res, next) => {
    const uploadMixedFiles = upload.fields(fields);

    uploadMixedFiles(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size too large. Maximum size is 10MB.",
          });
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            success: false,
            message: "Too many files.",
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  };
};

// Helper function to delete file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

// Helper function to get file URL
const getFileUrl = (req, filePath) => {
  if (!filePath) return null;

  // If it's already a full URL (starts with http:// or https://), return it as is
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

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

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadMixed,
  deleteFile,
  getFileUrl,
  getRelativePath,
};
