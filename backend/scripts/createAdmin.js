import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      name: "Super Admin",
      email: "admin@gym.com",
      passwordHash: hashedPassword,   // IMPORTANT!
    });

    await admin.save();
    console.log("Admin created:", admin.email, "password: admin123");
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();