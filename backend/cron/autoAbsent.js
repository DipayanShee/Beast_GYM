import cron from "node-cron";
import Attendance from "../models/Attendance.js";
import Member from "../models/Member.js";

export default function autoAbsentJob() {
  // Runs every night at 11:00 PM
  cron.schedule("0 23 * * *", async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);

      // Get all members
      const members = await Member.find();

      // Find attendance already marked today
      const attendanceMarked = await Attendance.find({ date: today });
      const attendedMemberIds = attendanceMarked.map(a => a.memberId.toString());

      // Filter members who didn't attend today
      const absentMembers = members.filter(
        (m) => !attendedMemberIds.includes(m._id.toString())
      );

      // Mark each absent
      for (const m of absentMembers) {
        await Attendance.create({
          memberId: m._id,
          fullName: m.fullName,
          phone: m.phone,
          status: "absent",
          date: today,
        });
      }

      console.log(`AUTO ABSENT DONE FOR ${today}`);
    } catch (err) {
      console.error("Auto-Absent Cron Error:", err);
    }
  });
}