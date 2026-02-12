import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
    },

    email: {
      type: String,
    },

    avatar: {
      type: String,
    },

    language: {
      type: String,
      enum: ["ml", "en"],
      default: "ml",
    },

    region: {
      type: String,
      enum: ["Kerala", "Worldwide"],
      default: "Kerala",
    },

    // 📰 Used for feed ranking / ML / recommendations
    interests: {
      type: [String],
      default: [],
    },

    // 🔔 Notifications per category
    notificationPrefs: {
      type: Map,
      of: [String], // keywords per category
      default: {},
    },

    // ⭐ NEW: Top-bar & onboarding selected categories
    preferences: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
