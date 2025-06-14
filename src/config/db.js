import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // process.exit(1);
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
