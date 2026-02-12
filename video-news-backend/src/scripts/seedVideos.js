import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "../models/Video.model.js";

dotenv.config();

const videos = [
  {
    videoId: "vid001",
    title: "Major Crime Update in Kochi",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
    category: "Crime",
    region: "Kerala",
    channelName: "Kerala News",
    publishedAt: new Date(),
  },
  {
    videoId: "vid002",
    title: "Kerala Blasters Match Highlights",
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
    category: "Sports",
    region: "Kerala",
    channelName: "Sports Today",
    publishedAt: new Date(),
  },
  {
    videoId: "vid003",
    title: "Latest Malayalam Movie Trailer",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    category: "Movies",
    region: "Kerala",
    channelName: "Movie Updates",
    publishedAt: new Date(),
  },
  {
    videoId: "vid004",
    title: "PSC Exam Notification 2026",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    category: "Education",
    region: "Kerala",
    channelName: "Edu Kerala",
    publishedAt: new Date(),
  },
  {
    videoId: "vid005",
    title: "IT Job Openings in Kochi",
    thumbnail: "https://img.youtube.com/vi/oUFJJNQGwhk/maxresdefault.jpg",
    category: "Jobs",
    region: "Kerala",
    channelName: "Career Hub",
    publishedAt: new Date(),
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Video.deleteMany();
    await Video.insertMany(videos);
    console.log("✅ Demo videos inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
};

seed();
