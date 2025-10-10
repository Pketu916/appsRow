// Debug script to test file upload functionality
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = uploadsDir;

    if (file.fieldname === "image") {
      uploadPath = path.join(uploadsDir, "deals");
    } else if (file.fieldname === "additionalImages") {
      uploadPath = path.join(uploadsDir, "deals/additional");
    } else if (file.fieldname === "ctaBgImage") {
      uploadPath = path.join(uploadsDir, "deals/cta");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error("Only image files (JPEG, JPG, PNG, GIF, WEBP) are allowed!")
      );
    }
  },
});

app.use(express.json());

// Test endpoint
app.post(
  "/test-upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
    { name: "ctaBgImage", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("=== DEBUG UPLOAD ===");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const response = {
      success: true,
      message: "Upload test successful",
      body: req.body,
      files: req.files,
      filePaths: {},
    };

    if (req.files) {
      if (req.files.image) {
        response.filePaths.image = req.files.image[0].path;
      }
      if (req.files.additionalImages) {
        response.filePaths.additionalImages = req.files.additionalImages.map(
          (f) => f.path
        );
      }
      if (req.files.ctaBgImage) {
        response.filePaths.ctaBgImage = req.files.ctaBgImage[0].path;
      }
    }

    res.json(response);
  }
);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test-upload`);
});
