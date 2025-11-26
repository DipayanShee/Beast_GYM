// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import autoAbsentJob from "./cron/autoAbsent.js";


dotenv.config();
connectDB();
autoAbsentJob();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Beast Gym API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/enquiries", enquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));