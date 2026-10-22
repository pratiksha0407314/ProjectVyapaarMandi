
import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import cropRoutes from "./routes/crops.js";

console.log("Environment file check:", process.cwd());
console.log("JWT_SECRET loaded:", Boolean(process.env.JWT_SECRET));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Vyapaar Mandi backend is running");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);

// Start server after database connection
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(
      "MongoDB connection or server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
