// routes/attendanceRoutes.js
import express from "express";
import Attendance from "../models/Attendance.js";
import Member from "../models/Member.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* -------------------
   MARK ATTENDANCE
------------------- */
router.post("/mark", protect, async (req, res) => {
  try {
    const { memberId, date, status } = req.body;

    if (!memberId || !date) {
      return res.status(400).json({ message: "Member ID and date are required" });
    }

    let record = await Attendance.findOne({ member: memberId, date });

    if (record) {
      record.status = status;
      await record.save();
    } else {
      record = await Attendance.create({
        member: memberId,
        date,
        status,
      });
    }

    res.json({ message: "Attendance saved", data: record });
  } catch (err) {
    console.error("Attendance mark error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* --------------------------------------
   GET ATTENDANCE FOR SELECTED DATE
--------------------------------------- */
router.get("/", protect, async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const members = await Member.find({ isActive: true }).sort("fullName").lean();
    const records = await Attendance.find({ date }).lean();

    const attMap = {};
    records.forEach((r) => {
      attMap[r.member.toString()] = r.status;
    });

    const result = members.map((m) => ({
      memberId: m._id,
      fullName: m.fullName,
      phone: m.phone,
      status: attMap[m._id.toString()] || null,
    }));

    res.json(result);
  } catch (err) {
    console.error("Attendance fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------------------------
   NEW API 1 → Member-wise Full Attendance History
------------------------------------------------------ */
router.get("/history/member/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const records = await Attendance.find({ member: id })
      .sort({ date: -1 })
      .lean();

    res.json(records);
  } catch (err) {
    console.error("Member history error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------------------------
   NEW API 2 → List all dates that have attendance taken
------------------------------------------------------ */
router.get("/history/dates", protect, async (req, res) => {
  try {
    const dates = await Attendance.distinct("date");

    res.json(dates.sort());
  } catch (err) {
    console.error("Dates history error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------------------------
   NEW API 3 → Get attendance for ANY previous date
------------------------------------------------------ */
router.get("/history/date/:date", protect, async (req, res) => {
  try {
    const { date } = req.params;

    const records = await Attendance.find({ date })
      .populate("member", "fullName phone")
      .lean();

    res.json(records);
  } catch (err) {
    console.error("Date history error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;