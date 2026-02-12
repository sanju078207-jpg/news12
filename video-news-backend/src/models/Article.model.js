import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    source: String,
    url: { type: String, unique: true },
    region: { type: String, default: "kerala" },
        language: String, // 👈 ADD THIS
    publishedAt: Date
  },
  { timestamps: true }
);

// 🔥 Auto delete after 24 hours
articleSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 }
);

export default mongoose.model("Article", articleSchema);
