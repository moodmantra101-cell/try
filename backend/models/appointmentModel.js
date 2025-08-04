import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: {
    type: Object,
    ref: "User",
    required: true,
  },
  docData: {
    type: Object,
    ref: "Doctor",
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  // New fields for appointment details
  reasonForVisit: { type: String, required: true },
  sessionType: { type: String, required: true, enum: ["Online", "In-Person"] },
  communicationMethod: {
    type: String,
    enum: ["Zoom", "Google Meet", "Phone Call"],
  },
  briefNotes: { type: String, maxlength: 200 },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
    relationship: { type: String },
  },
  consentGiven: { type: Boolean, required: true, default: false },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
