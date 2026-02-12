import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: String,
    description: String,

    thumbnail: String,
    duration: String,

    channelId: String,
    channelName: String,

    // user interest / category (Crime, Education, etc.)
    category: {
      type: String,
      index: true,
    },

    region: {
      type: String,
      enum: ["Kerala", "Worldwide"],
      index: true,
      default: "Kerala",
    },

    tags: [String],

    publishedAt: Date,

    // 🔑 IMPORTANT FOR CACHING
    fetchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    source: {
      type: String,
      default: "youtube",
    },
  },
  { timestamps: true }
);

// 🚀 Optimized indexes for Home carousel
videoSchema.index({ category: 1, region: 1, fetchedAt: -1 });
videoSchema.index({ publishedAt: -1 });

export default mongoose.model("Video", videoSchema);
