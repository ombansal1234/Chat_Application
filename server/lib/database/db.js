import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_URL)
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`.red);
  }
};
