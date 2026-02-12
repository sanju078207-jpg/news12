import User from "../models/User.model.js";
import Video from "../models/Video.model.js";
import { KERALA_NEWS_CHANNELS } from "../constants/keralaChannels.js";
import { fetchVideosFromYouTube } from "../services/youtube.service.js";

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const getHomeVideos = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { preferences, language } = user;
    if (!preferences || preferences.length === 0) {
      return res.json({ success: true, videos: [] });
    }

    let finalVideos = [];
    const seen = new Set();
    const now = Date.now();

    for (const interest of preferences) {
      // 1️⃣ Check cache
      const cachedVideos = await Video.find({
        interest,
        fetchedAt: { $gte: new Date(now - CACHE_DURATION) },
      }).limit(5);

      if (cachedVideos.length > 0) {
        cachedVideos.forEach((v) => {
          if (!seen.has(v.videoId)) {
            seen.add(v.videoId);
            finalVideos.push(v);
          }
        });
        continue;
      }

      // 2️⃣ Cache miss → fetch from YouTube
      for (const channel of KERALA_NEWS_CHANNELS) {
        const ytVideos = await fetchVideosFromYouTube({
          interest,
          channelId: channel.id,
          language,
        });

        for (const item of ytVideos) {
          const videoId = item.id.videoId;
          if (seen.has(videoId)) continue;

          seen.add(videoId);

          const videoDoc = {
            videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            channel: item.snippet.channelTitle,
            interest,
            publishedAt: item.snippet.publishedAt,
            fetchedAt: new Date(),
          };

          // save to DB (ignore duplicates safely)
          await Video.updateOne(
            { videoId },
            { $setOnInsert: videoDoc },
            { upsert: true }
          );

          finalVideos.push(videoDoc);
        }
      }
    }

    // sort newest first
    finalVideos.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    res.json({
      success: true,
      cached: true,
      videos: finalVideos.slice(0, 20),
    });
  } catch (err) {
    console.error("Home video cache error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
