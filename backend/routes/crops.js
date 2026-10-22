
import express from "express";
import mongoose from "mongoose";
import Crop from "../models/Crop.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Only farmer accounts can use these crop routes.
router.use((req, res, next) => {
  if (req.user.role !== "farmer") {
    return res.status(403).json({
      message: "Only farmer accounts can manage crop listings.",
    });
  }

  next();
});

// GET the logged-in farmer's profile and crops.
router.get("/", async (req, res) => {
  try {
    const farmer = await User.findById(req.user.userId).select(
      "name email phone role farmerId farmType farmAddress createdAt"
    );

    if (!farmer || farmer.role !== "farmer") {
      return res.status(404).json({
        message: "Farmer account not found.",
      });
    }

    const crops = await Crop.find({
      farmer: farmer._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      farmer,
      crops,
    });
  } catch (error) {
    console.error("Fetch farmer dashboard error:", error.message);

    return res.status(500).json({
      message: "Unable to load the farmer dashboard.",
    });
  }
});

// CREATE a crop listing.
router.post("/", async (req, res) => {
  try {
    const {
      cropName,
      quantity,
      unit,
      pricePerUnit,
      location,
      description,
    } = req.body;

    if (
      !cropName?.trim() ||
      quantity === undefined ||
      !unit ||
      pricePerUnit === undefined ||
      !location?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill in all required crop details.",
      });
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(pricePerUnit);

    if (
      !Number.isFinite(parsedQuantity) ||
      parsedQuantity <= 0 ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice <= 0
    ) {
      return res.status(400).json({
        message: "Quantity and price must be greater than zero.",
      });
    }

    if (!["kg", "quintal", "tonne"].includes(unit)) {
      return res.status(400).json({
        message: "Please select a valid quantity unit.",
      });
    }

    const crop = await Crop.create({
      farmer: req.user.userId,
      cropName: cropName.trim(),
      quantity: parsedQuantity,
      unit,
      pricePerUnit: parsedPrice,
      location: location.trim(),
      description: description?.trim() || "",
    });

    return res.status(201).json({
      message: "Crop listing added successfully.",
      crop,
    });
  } catch (error) {
    console.error("Create crop error:", error.message);

    return res.status(500).json({
      message: "Unable to save the crop listing.",
    });
  }
});

// UPDATE a crop belonging to the logged-in farmer.
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid crop ID.",
      });
    }

    const allowedFields = [
      "cropName",
      "quantity",
      "unit",
      "pricePerUnit",
      "location",
      "description",
      "status",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (
      Object.keys(updates).length === 0 ||
      (updates.cropName !== undefined &&
        (typeof updates.cropName !== "string" ||
          !updates.cropName.trim())) ||
      (updates.location !== undefined &&
        (typeof updates.location !== "string" ||
          !updates.location.trim())) ||
      (updates.description !== undefined &&
        typeof updates.description !== "string") ||
      (updates.quantity !== undefined &&
        (!Number.isFinite(Number(updates.quantity)) ||
          Number(updates.quantity) <= 0)) ||
      (updates.pricePerUnit !== undefined &&
        (!Number.isFinite(Number(updates.pricePerUnit)) ||
          Number(updates.pricePerUnit) <= 0)) ||
      (updates.unit !== undefined &&
        !["kg", "quintal", "tonne"].includes(updates.unit)) ||
      (updates.status !== undefined &&
        !["Available", "Sold"].includes(updates.status))
    ) {
      return res.status(400).json({
        message: "Please check the crop details and try again.",
      });
    }

    if (updates.cropName !== undefined) {
      updates.cropName = updates.cropName.trim();
    }

    if (updates.location !== undefined) {
      updates.location = updates.location.trim();
    }

    if (updates.quantity !== undefined) {
      updates.quantity = Number(updates.quantity);
    }

    if (updates.pricePerUnit !== undefined) {
      updates.pricePerUnit = Number(updates.pricePerUnit);
    }

    if (updates.description !== undefined) {
      updates.description = updates.description.trim();
    }

    const crop = await Crop.findOneAndUpdate(
      {
        _id: req.params.id,
        farmer: req.user.userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found in your listings.",
      });
    }

    return res.status(200).json({
      message: "Crop listing updated successfully.",
      crop,
    });
  } catch (error) {
    console.error("Update crop error:", error.message);

    return res.status(500).json({
      message: "Unable to update the crop listing.",
    });
  }
});

// DELETE a crop belonging to the logged-in farmer.
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid crop ID.",
      });
    }

    const crop = await Crop.findOneAndDelete({
      _id: req.params.id,
      farmer: req.user.userId,
    });

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found in your listings.",
      });
    }

    return res.status(200).json({
      message: "Crop listing deleted successfully.",
    });
  } catch (error) {
    console.error("Delete crop error:", error.message);

    return res.status(500).json({
      message: "Unable to delete the crop listing.",
    });
  }
});

export default router;
