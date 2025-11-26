// models/Member.js
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },

    gender: { type: String },
    age: { type: Number },
    address: { type: String },

    joinDate: { type: Date, default: Date.now },

    // Membership plan
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipPlan" },
    planStartDate: { type: Date },
    planEndDate: { type: Date },

    // 💰 Fee tracking
    lastPaidDate: { type: Date }, // when the last cash payment was done
    nextDueDate: { type: Date },  // when the next payment is due

    feeStatus: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending",
    },

    isActive: { type: Boolean, default: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);