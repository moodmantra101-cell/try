import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000,
  },
  excerpt: {
    type: String,
    maxlength: 200,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "mental-health",
      "wellness",
      "relationships",
      "parenting",
      "stress-management",
      "self-care",
      "therapy",
      "personal-story",
    ],
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  imageUrl: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  adminNotes: {
    type: String,
    maxlength: 500,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
blogPostSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Generate excerpt if not provided
  if (!this.excerpt && this.content) {
    this.excerpt =
      this.content.length > 150
        ? this.content.substring(0, 150) + "..."
        : this.content;
  }

  next();
});

// Index for better query performance
blogPostSchema.index({ status: 1, category: 1 });
blogPostSchema.index({ authorId: 1, status: 1 });
blogPostSchema.index({ submittedAt: -1 });

const blogPostModel =
  mongoose.models.blogPost || mongoose.model("blogPost", blogPostSchema);

export default blogPostModel;
