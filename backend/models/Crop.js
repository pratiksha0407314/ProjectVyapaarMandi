
import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    cropName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },

    unit: {
      type: String,
      required: true,
      enum: ["kg", "quintal", "tonne"],
    },

    pricePerUnit: {
      type: Number,
      required: true,
      min: 0.01,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
