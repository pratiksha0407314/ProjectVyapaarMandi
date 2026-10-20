
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

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

    if (!name || !email || !password || !role || !phone) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    if (!["farmer", "vendor", "transporter"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    if (role === "farmer" && (!farmType || !farmAddress)) {
      return res.status(400).json({
        message: "Please provide your farm details.",
      });
    }

    if (role === "vendor" && (!businessType || !businessAddress)) {
      return res.status(400).json({
        message: "Please provide your business details.",
      });
    }

    if (
      role === "transporter" &&
      (!vehicleType || !vehicleNo || !licenseNo || !driverName)
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

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

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
      });
    }

    if (!["farmer", "vendor", "transporter"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role selected.",
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

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from the environment.");
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});

export default router;
