const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Place name is required"],
      trim: true,
      maxlength: [200, "Place name cannot exceed 200 characters"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],
    attractions: [
      {
        type: String,
        trim: true,
      },
    ],
    bestTimeToVisit: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    image: {
      type: String,
    },
    additionalImages: [
      {
        type: String,
      },
    ],
    coordinates: {
      latitude: {
        type: Number,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
placeSchema.index({
  name: "text",
  state: "text",
  country: "text",
});
placeSchema.index({ country: 1, state: 1 });
placeSchema.index({ isActive: 1 });

module.exports = mongoose.model("Place", placeSchema);

