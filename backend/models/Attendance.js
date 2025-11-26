// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    date: {
      // store as YYYY-MM-DD string
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      default: "present",
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ member: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);