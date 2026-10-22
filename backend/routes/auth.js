import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const allowedRoles = ["farmer", "vendor", "transporter"];

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    ...(user.role === "farmer"
      ? {
          farmerId: user.farmerId,
          farmType: user.farmType,
          farmAddress: user.farmAddress,
        }
      : {}),
  };
}

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      farmType,
      farmAddress,
      businessType,
      businessAddress,
      vehicleType,
      vehicleNo,
      licenseNo,
      driverName,
    } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !role ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    if (role === "farmer" && (!farmType?.trim() || !farmAddress?.trim())) {
      return res.status(400).json({
        message: "Please provide your farm details.",
      });
    }

    if (
      role === "vendor" &&
      (!businessType?.trim() || !businessAddress?.trim())
    ) {
      return res.status(400).json({
        message: "Please provide your business details.",
      });
    }

    if (
      role === "transporter" &&
      (!vehicleType?.trim() ||
        !vehicleNo?.trim() ||
        !licenseNo?.trim() ||
        !driverName?.trim())
    ) {
      return res.status(400).json({
        message: "Please provide all transporter details.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password: hashedPassword,
      role,
      farmType,
      farmAddress,
      businessType,
      businessAddress,
      vehicleType,
      vehicleNo,
      licenseNo,
      driverName,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("REGISTRATION ERROR DETAILS:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password ||
      typeof role !== "string" ||
      !role
    ) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected.",
      });
    }

    if (!process.env.JWT_SECRET?.trim()) {
      console.error(
        "LOGIN CONFIGURATION ERROR: JWT_SECRET is missing or empty."
      );

      return res.status(500).json({
        message: "Server authentication configuration is missing.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!user.password) {
      console.error(
        "LOGIN DATA ERROR: The account has no readable password hash."
      );

      return res.status(500).json({
        message: "Unable to verify this account. Please contact support.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `This account is registered as a ${user.role}. Please select the correct role.`,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: publicUser(user),
    });
  } catch (error) {
    console.error("LOGIN ERROR DETAILS:", error);

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});

// GET THE ACTUAL LOGGED-IN USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      user: publicUser(user),
    });
  } catch (error) {
    console.error("FETCH PROFILE ERROR DETAILS:", error);

    return res.status(500).json({
      message: "Unable to load your profile.",
    });
  }
});

export default router;