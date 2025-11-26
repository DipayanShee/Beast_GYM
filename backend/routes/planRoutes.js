import express from "express";
import MembershipPlan from "../models/MembershipPlan.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all plans
router.get("/", protect, async (req, res) => {
  try {
    const plans = await MembershipPlan.find().sort("-createdAt");
    res.json(plans);
  } catch (err) {
    console.error("Get plans error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE a new plan
router.post("/", protect, async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    if (!name || !duration || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const plan = await MembershipPlan.create({ name, duration, price });

    res.status(201).json(plan);
  } catch (err) {
    console.error("Create plan error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE plan (optional)
router.delete("/:id", protect, async (req, res) => {
  try {
    await MembershipPlan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    console.error("Delete plan error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;