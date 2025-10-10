const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Deal title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviews: {
      type: Number,
      required: [true, "Reviews count is required"],
      min: [0, "Reviews cannot be negative"],
    },
    offer: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Honeymoon trip",
        "Family trip",
        "Adventure",
        "Adventure trip",
        "Business trip",
        "Solo trip",
        "Group trip",
        "Hiking and trekking",
        "Beach Holiday",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    oldPrice: {
      type: Number,
      min: [0, "Old price cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "USD",
      enum: ["USD", "INR", "EUR", "GBP"],
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
    inclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    exclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    image: {
      type: String,
      required: [true, "Main image is required"],
    },
    additionalImages: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    cta: {
      type: Boolean,
      default: false,
    },
    departureDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
    includes: [
      {
        type: String,
        trim: true,
      },
    ],
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
    },
    ctaBgImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
dealSchema.index({ title: "text", country: "text", category: "text" });
dealSchema.index({ isActive: 1, isFeatured: 1 });
dealSchema.index({ price: 1 });
dealSchema.index({ rating: -1 });

// Virtual for discount percentage
dealSchema.virtual("discountPercentage").get(function () {
  if (this.oldPrice && this.oldPrice > this.price) {
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }
  return 0;
});

// Ensure virtual fields are serialized
dealSchema.set("toJSON", { virtuals: true });
dealSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Deal", dealSchema);
