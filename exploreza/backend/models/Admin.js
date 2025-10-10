const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: function () {
        return this.loginMethod === "password";
      },
      minlength: [6, "Password must be at least 6 characters long"],
    },
    loginMethod: {
      type: String,
      enum: ["password", "otp", "both"],
      default: "password",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "moderator"],
      default: "admin",
    },
    lastLogin: {
      type: Date,
    },
    otpCode: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    permissions: {
      canManagePlaces: {
        type: Boolean,
        default: true,
      },
      canManageDestinations: {
        type: Boolean,
        default: true,
      },
      canManageDeals: {
        type: Boolean,
        default: true,
      },
      canViewEnquiries: {
        type: Boolean,
        default: true,
      },
      canManageAdmins: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate OTP
adminSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpCode = otp;
  this.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return otp;
};

// Verify OTP
adminSchema.methods.verifyOTP = function (otp) {
  if (!this.otpCode || !this.otpExpires) return false;
  if (new Date() > this.otpExpires) return false;
  return this.otpCode === otp;
};

// Clear OTP
adminSchema.methods.clearOTP = function () {
  this.otpCode = undefined;
  this.otpExpires = undefined;
};

// Remove password from JSON output
adminSchema.methods.toJSON = function () {
  const admin = this.toObject();
  delete admin.password;
  delete admin.otpCode;
  delete admin.otpExpires;
  return admin;
};

// Index for better search performance
adminSchema.index({ email: 1 });
adminSchema.index({ isActive: 1 });
adminSchema.index({ role: 1 });

module.exports = mongoose.model("Admin", adminSchema);
