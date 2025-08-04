// backend/models/assessmentModel.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      value: { type: Number, required: true }
    }
  ],
  category: { type: String, required: true }
});

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
  scoringRanges: [
    {
      minScore: { type: Number, required: true },
      maxScore: { type: Number, required: true },
      result: { type: String, required: true },
      recommendations: [{ type: String }]
    }
  ],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const userAssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectedOption: { type: Number, required: true }
    }
  ],
  totalScore: { type: Number, required: true },
  result: { type: String, required: true },
  recommendations: [{ type: String }],
  completedAt: { type: Date, default: Date.now }
});

export const Assessment = mongoose.model('Assessment', assessmentSchema);
export const UserAssessment = mongoose.model('UserAssessment', userAssessmentSchema);