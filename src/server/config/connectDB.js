import mongoose from "mongoose";

import { secret } from "./secret.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(secret.mongoURI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(err);
    //Exit process with 1
    process.exit(1);
  }
};

export default connectDB;
