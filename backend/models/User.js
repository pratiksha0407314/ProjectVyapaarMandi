
import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;
