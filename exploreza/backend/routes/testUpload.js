const express = require("express");
const router = express.Router();
const { uploadMixed } = require("../middleware/upload");

// Test endpoint for file upload
router.post(
  "/test-upload",
  uploadMixed([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
    { name: "ctaBgImage", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("=== TEST UPLOAD DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Request files:", req.files);

    const response = {
      success: true,
      message: "File upload test successful",
      data: {
        body: req.body,
        file: req.file,
        files: req.files,
        uploadedFiles: {},
      },
    };

    // Process uploaded files
    if (req.files) {
      if (req.files.image) {
        response.data.uploadedFiles.image = {
          path: req.files.image[0].path,
          filename: req.files.image[0].filename,
          originalname: req.files.image[0].originalname,
          mimetype: req.files.image[0].mimetype,
          size: req.files.image[0].size,
        };
      }
      if (req.files.additionalImages) {
        response.data.uploadedFiles.additionalImages =
          req.files.additionalImages.map((file) => ({
            path: file.path,
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
          }));
      }
      if (req.files.ctaBgImage) {
        response.data.uploadedFiles.ctaBgImage = {
          path: req.files.ctaBgImage[0].path,
          filename: req.files.ctaBgImage[0].filename,
          originalname: req.files.ctaBgImage[0].originalname,
          mimetype: req.files.ctaBgImage[0].mimetype,
          size: req.files.ctaBgImage[0].size,
        };
      }
    }

    res.json(response);
  }
);

module.exports = router;
