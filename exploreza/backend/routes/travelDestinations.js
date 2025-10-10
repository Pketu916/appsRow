const express = require("express");
const router = express.Router();
const {
  getTravelDestinations,
  getTravelDestinationsAdmin,
  getTravelDestination,
  createTravelDestination,
  updateTravelDestination,
  deleteTravelDestination,
  getFeaturedTravelDestinations,
} = require("../controllers/travelDestinationController");
const { uploadMixed } = require("../middleware/upload");

// Public routes
router.get("/", getTravelDestinations);
router.get("/featured", getFeaturedTravelDestinations);
router.get("/:id", getTravelDestination);

// Admin routes
router.get("/admin/all", getTravelDestinationsAdmin);

// Admin routes (for now public, add auth middleware later)
router.post(
  "/",
  uploadMixed([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
    { name: "ctaBgImage", maxCount: 1 },
  ]),
  createTravelDestination
);

router.put(
  "/:id",
  uploadMixed([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
    { name: "ctaBgImage", maxCount: 1 },
  ]),
  updateTravelDestination
);

router.delete("/:id", deleteTravelDestination);

module.exports = router;
