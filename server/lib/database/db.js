import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`.red);
  }
};
