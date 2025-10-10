const express = require("express");
const router = express.Router();
const {
  getDeals,
  getDeal,
  createDeal,
  updateDeal,
  deleteDeal,
  getFeaturedDeals,
  getDealsByCategory,
} = require("../controllers/dealController");
const {
  validateDeal,
  validateObjectId,
  validatePagination,
  validateSearch,
} = require("../middleware/validation");
const { uploadMixed } = require("../middleware/upload");

// Public routes
router.get("/", validatePagination, validateSearch, getDeals);
router.get("/featured", getFeaturedDeals);
router.get("/category/:category", validatePagination, getDealsByCategory);
router.get("/:id", validateObjectId("id"), getDeal);

// CRUD routes (Public for now - can add authentication later)
router.post(
  "/",
  uploadMixed([
    { name: "bigImage", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),
  validateDeal,
  createDeal
);

router.put(
  "/:id",
  validateObjectId("id"),
  uploadMixed([
    { name: "bigImage", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),
  validateDeal,
  updateDeal
);

router.delete("/:id", validateObjectId("id"), deleteDeal);

module.exports = router;
