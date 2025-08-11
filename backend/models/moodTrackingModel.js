import mongoose from "mongoose";

// Schema for individual mood entries
const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  moodScore: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  moodLabel: {
    type: String,
    required: true,
    enum: [
      "very_happy",
      "happy",
      "neutral",
      "sad",
      "very_sad",
      "anxious",
      "stressed",
      "excited",
      "calm",
      "angry",
    ],
  },
  activities: [
    {
      type: String,
      enum: [
        "exercise",
        "work",
        "social",
        "sleep",
        "eating",
        "hobby",
        "family",
        "travel",
        "study",
        "other",
      ],
    },
  ],
  textFeedback: {
    type: String,
    maxLength: 1000,
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  weather: {
    condition: String,
    temperature: Number,
    humidity: Number,
  },
  sleepHours: {
    type: Number,
    min: 0,
    max: 24,
  },
  stressLevel: {
    type: Number,
    min: 1,
    max: 10,
  },
  energyLevel: {
    type: Number,
    min: 1,
    max: 10,
  },
  socialInteraction: {
    type: Number,
    min: 1,
    max: 10,
  },
  tags: [String], // Custom tags for categorization
  isPublic: {
    type: Boolean,
    default: false,
  },
});

// Schema for AI analysis results
const aiAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  analysisDate: {
    type: Date,
    default: Date.now,
  },
  analysisType: {
    type: String,
    enum: ["daily", "weekly", "monthly", "crisis", "pattern"],
    required: true,
  },
  moodTrend: {
    direction: {
      type: String,
      enum: ["improving", "declining", "stable", "fluctuating"],
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    factors: [String],
  },
  patterns: {
    triggers: [
      {
        factor: String,
        impact: Number, // -1 to 1 scale
        frequency: Number,
      },
    ],
    positiveActivities: [
      {
        activity: String,
        effectiveness: Number, // 0 to 1 scale
        frequency: Number,
      },
    ],
    riskFactors: [
      {
        factor: String,
        severity: Number, // 0 to 1 scale
        frequency: Number,
      },
    ],
  },
  recommendations: [
    {
      type: {
        type: String,
        enum: [
          "activity",
          "therapy",
          "meditation",
          "social",
          "exercise",
          "sleep",
          "diet",
          "crisis",
        ],
      },
      title: String,
      description: String,
      priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
      },
      confidence: Number,
    },
  ],
  insights: {
    moodVariability: Number,
    dominantMood: String,
    bestTimeOfDay: String,
    worstTimeOfDay: String,
    weeklyPattern: String,
    seasonalTrends: String,
  },
  riskAssessment: {
    overallRisk: {
      type: String,
      enum: ["low", "moderate", "high", "critical"],
    },
    riskFactors: [String],
    crisisIndicators: [String],
    recommendedActions: [String],
  },
  metadata: {
    dataPointsAnalyzed: Number,
    timeRange: {
      start: Date,
      end: Date,
    },
    aiModelVersion: String,
    processingTime: Number,
  },
});

// Schema for mood goals and achievements
const moodGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  targetMoodScore: {
    type: Number,
    min: 1,
    max: 5,
  },
  targetFrequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  progress: {
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    totalDays: {
      type: Number,
      default: 0,
    },
    successRate: {
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  achievements: [
    {
      type: {
        type: String,
        enum: ["streak", "milestone", "improvement"],
      },
      title: String,
      description: String,
      achievedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Indexes for better query performance
moodEntrySchema.index({ userId: 1, timestamp: -1 });
moodEntrySchema.index({ userId: 1, moodScore: 1 });
moodEntrySchema.index({ userId: 1, moodLabel: 1 });

aiAnalysisSchema.index({ userId: 1, analysisDate: -1 });
aiAnalysisSchema.index({ userId: 1, analysisType: 1 });

moodGoalSchema.index({ userId: 1, isActive: 1 });
moodGoalSchema.index({ userId: 1, startDate: -1 });

// Create models
const MoodEntry =
  mongoose.models.MoodEntry || mongoose.model("MoodEntry", moodEntrySchema);
const AIAnalysis =
  mongoose.models.AIAnalysis || mongoose.model("AIAnalysis", aiAnalysisSchema);
const MoodGoal =
  mongoose.models.MoodGoal || mongoose.model("MoodGoal", moodGoalSchema);

export { MoodEntry, AIAnalysis, MoodGoal };
