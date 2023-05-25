import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Establish the MongoDB connection
    await mongoose.connect("mongodb://localhost:27017/chess");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with an error
  }
};

export default connectDB;
