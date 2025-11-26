import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    message: String,
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);