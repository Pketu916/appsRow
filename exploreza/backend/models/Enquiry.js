const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },
    packageTitle: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    adults: {
      type: Number,
      required: [true, "Number of adults is required"],
      min: [1, "At least 1 adult is required"],
      max: [20, "Maximum 20 adults allowed"],
    },
    children: {
      type: Number,
      default: 0,
      min: [0, "Children count cannot be negative"],
      max: [10, "Maximum 10 children allowed"],
    },
    selectedPlan: {
      type: String,
      enum: ["deluxe", "superDeluxe", "luxury"],
      default: "superDeluxe",
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "pending", "contacted", "confirmed", "cancelled"],
      default: "new",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ email: 1 });

// Virtual for formatted travel date
enquirySchema.virtual("formattedTravelDate").get(function () {
  return this.travelDate.toLocaleDateString();
});

// Virtual for total guests
enquirySchema.virtual("totalGuests").get(function () {
  return this.adults + this.children;
});

// Pre-save middleware to update updatedAt
enquirySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get enquiries by status
enquirySchema.statics.getByStatus = function (status) {
  return this.find({ status: status }).sort({ createdAt: -1 });
};

// Static method to get recent enquiries
enquirySchema.statics.getRecent = function (limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

// Instance method to update status
enquirySchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  this.updatedAt = Date.now();
  return this.save();
};

module.exports = mongoose.model("Enquiry", enquirySchema);
