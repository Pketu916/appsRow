const express = require("express");
const router = express.Router();
const {
  getPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace,
  getPlacesByLocation,
} = require("../controllers/placeController");
const { upload } = require("../middleware/upload");

// Public routes
router.get("/", getPlaces);
router.get("/by-location", getPlacesByLocation);
router.get("/:id", getPlace);

// Admin routes (for now, these are public - add authentication later)
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
  ]),
  createPlace
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
  ]),
  updatePlace
);

router.delete("/:id", deletePlace);

module.exports = router;

