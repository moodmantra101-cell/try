import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Patient",
  },
  quote: {
    type: String,
    required: true,
    maxlength: 500,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
testimonialSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const testimonialModel =
  mongoose.models.testimonial ||
  mongoose.model("testimonial", testimonialSchema);

export default testimonialModel;
