
import mongoose from "mongoose";
import { randomBytes } from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["farmer", "vendor", "transporter"],
    },

    // Automatically generated for farmers only
    farmerId: {
      type: String,
      immutable: true,
    },

    farmType: String,
    farmAddress: String,
    businessType: String,
    businessAddress: String,
    vehicleType: String,
    vehicleNo: String,
    licenseNo: String,
    driverName: String,

    availability: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: "English",
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

// Enforce unique Farmer IDs without requiring IDs for other roles.
userSchema.index(
  { farmerId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: "farmer",
      farmerId: { $type: "string" },
    },
  }
);

// Generate the ID on the backend before saving a new farmer.
userSchema.pre("save", function () {
  if (this.role === "farmer" && !this.farmerId) {
    const year = new Date().getFullYear();
    const randomPart = randomBytes(4).toString("hex").toUpperCase();

    this.farmerId = `FAR-${year}-${randomPart}`;
  }

  // Other roles must not have a Farmer ID.
  if (this.role !== "farmer") {
    this.farmerId = undefined;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
