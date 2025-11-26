// routes/memberRoutes.js
import express from "express";
import Member from "../models/Member.js";
import MembershipPlan from "../models/MembershipPlan.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ====================================
   GET ALL MEMBERS (with search)
==================================== */
router.get("/", protect, async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { fullName: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    const members = await Member.find(filter)
      .populate("plan")
      .sort({ createdAt: -1 });

    // Auto-mark overdue
    const today = new Date();
    for (let m of members) {
      if (m.nextDueDate && today > m.nextDueDate && m.feeStatus !== "overdue") {
        m.feeStatus = "overdue";
        await m.save();
      }
    }

    res.json(members);
  } catch (err) {
    console.error("Fetch members error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ====================================
   ADD NEW MEMBER
==================================== */
router.post("/", protect, async (req, res) => {
  try {
    const { fullName, phone, email, planId } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ message: "Full name and phone required" });
    }

    let nextDueDate = null;
    let plan = null;

    if (planId) {
      plan = await MembershipPlan.findById(planId);
      if (plan) {
        nextDueDate = new Date();
        // `duration` is in months
        nextDueDate.setMonth(nextDueDate.getMonth() + plan.duration);
      }
    }

    const member = await Member.create({
      fullName,
      phone,
      email: email || "-",
      plan: plan?._id || null,
      feeStatus: "pending",
      nextDueDate,
      joinDate: new Date(),
    });

    res.status(201).json(member);
  } catch (err) {
    console.error("Member create error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ====================================
   MARK MEMBER AS PAID
==================================== */
router.put("/:id/mark-paid", protect, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate("plan");
    if (!member) return res.status(404).json({ message: "Member not found" });

    const today = new Date();
    member.lastPaidDate = today;

    if (member.plan) {
      const next = new Date(today);
      next.setMonth(next.getMonth() + member.plan.duration); // months
      member.nextDueDate = next;
    }

    member.feeStatus = "paid";
    await member.save();

    res.json({ message: "Payment recorded", member });
  } catch (err) {
    console.error("Mark paid error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ====================================
   MARK MEMBER AS PENDING (manual)
==================================== */
router.put("/:id/mark-pending", protect, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    member.feeStatus = "pending";
    await member.save();

    res.json({ message: "Marked as pending", member });
  } catch (err) {
    console.error("Mark pending error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ====================================
   MONTH-WISE FEE SUMMARY
   GET /api/members/fees/summary?year=2025&month=11   (month = 1-12)
==================================== */
router.get("/fees/summary", protect, async (req, res) => {
  try {
    const now = new Date();
    const year = parseInt(req.query.year, 10) || now.getFullYear();
    const month = parseInt(req.query.month, 10) || now.getMonth() + 1; // 1-12

    const start = new Date(year, month - 1, 1); // inclusive
    const end = new Date(year, month, 0, 23, 59, 59, 999); // inclusive last day

    const members = await Member.find({}).populate("plan");

    const paid = [];
    const due = [];
    const overdue = [];

    const inRange = (date) => date && date >= start && date <= end;
    const today = new Date();

    for (let m of members) {
      const lastPaid = m.lastPaidDate;
      const nextDue = m.nextDueDate;

      if (inRange(lastPaid)) {
        paid.push(m);
      }

      if (inRange(nextDue) && m.feeStatus !== "paid") {
        if (nextDue < today || m.feeStatus === "overdue") {
          overdue.push(m);
        } else {
          due.push(m);
        }
      } else if (!nextDue && m.feeStatus === "pending") {
        // Optional: treat "never paid" as due this month
        due.push(m);
      }
    }

    const mapMember = (m) => ({
      _id: m._id,
      fullName: m.fullName,
      phone: m.phone,
      feeStatus: m.feeStatus,
      lastPaidDate: m.lastPaidDate,
      nextDueDate: m.nextDueDate,
      planName: m.plan?.name || null,
    });

    res.json({
      year,
      month,
      counts: {
        paid: paid.length,
        due: due.length,
        overdue: overdue.length,
      },
      paid: paid.map(mapMember),
      due: due.map(mapMember),
      overdue: overdue.map(mapMember),
    });
  } catch (err) {
    console.error("Fees summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ====================================
   DELETE MEMBER
==================================== */
router.delete("/:id", protect, async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error("Delete member error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;