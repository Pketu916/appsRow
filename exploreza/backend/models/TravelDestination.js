const mongoose = require("mongoose");

const travelDestinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Destination title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    tripType: {
      type: String,
      required: [true, "Trip type is required"],
      enum: ["domestic", "international"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    states: [
      {
        type: String,
        trim: true,
      },
    ],
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
      required: false,
      trim: true,
      enum: [
        "",
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
    // Places as simple strings
    places: [
      {
        type: String,
        trim: true,
      },
    ],
    // Plans with different pricing
    plans: {
      deluxe: {
        price: {
          type: Number,
          required: [true, "Deluxe plan price is required"],
          min: [0, "Price cannot be negative"],
        },
        oldPrice: {
          type: Number,
          min: [0, "Old price cannot be negative"],
        },
        facilities: [
          {
            type: String,
            trim: true,
          },
        ],
        description: {
          type: String,
          trim: true,
        },
      },
      superDeluxe: {
        price: {
          type: Number,
          required: [true, "Super Deluxe plan price is required"],
          min: [0, "Price cannot be negative"],
        },
        oldPrice: {
          type: Number,
          min: [0, "Old price cannot be negative"],
        },
        facilities: [
          {
            type: String,
            trim: true,
          },
        ],
        description: {
          type: String,
          trim: true,
        },
      },
      luxury: {
        price: {
          type: Number,
          required: [true, "Luxury plan price is required"],
          min: [0, "Price cannot be negative"],
        },
        oldPrice: {
          type: Number,
          min: [0, "Old price cannot be negative"],
        },
        facilities: [
          {
            type: String,
            trim: true,
          },
        ],
        description: {
          type: String,
          trim: true,
        },
      },
    },
    // Legacy price field for backward compatibility
    price: {
      type: Number,
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
      // Temporarily make it optional for testing
      required: false,
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
      required: false,
    },
    returnDate: {
      type: Date,
      required: false,
    },
    departureDateEnabled: {
      type: Boolean,
      default: true,
    },
    returnDateEnabled: {
      type: Boolean,
      default: true,
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
travelDestinationSchema.index({
  title: "text",
  country: "text",
  category: "text",
});
travelDestinationSchema.index({ isActive: 1, isFeatured: 1 });
travelDestinationSchema.index({ tripType: 1 });
travelDestinationSchema.index({ price: 1 });
travelDestinationSchema.index({ rating: -1 });
travelDestinationSchema.index({ "plans.deluxe.price": 1 });
travelDestinationSchema.index({ "plans.superDeluxe.price": 1 });
travelDestinationSchema.index({ "plans.luxury.price": 1 });

// Virtual for discount percentage
travelDestinationSchema.virtual("discountPercentage").get(function () {
  if (this.oldPrice && this.oldPrice > this.price) {
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }
  return 0;
});

// Ensure virtual fields are serialized
travelDestinationSchema.set("toJSON", { virtuals: true });
travelDestinationSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("TravelDestination", travelDestinationSchema);
