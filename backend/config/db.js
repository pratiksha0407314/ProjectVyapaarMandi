
import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["192.168.5.51"]);

const connectDB = async () => {
  try {
    console.log("Using DNS server:", dns.getServers().join(", "));

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
