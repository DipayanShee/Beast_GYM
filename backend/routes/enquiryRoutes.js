import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

// Create enquiry
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      message,
      date: new Date(),
    });

    res.status(201).json(enquiry);
  } catch (error) {
    console.error("Enquiry create error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ date: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error("Enquiry fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;