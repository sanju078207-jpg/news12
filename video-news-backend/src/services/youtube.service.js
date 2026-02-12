import axios from "axios";
import { getKey, rotateKey } from "../utils/youtubeKeys.js";
import { buildSearchQuery } from "../utils/buildSearchQuery.js";

/**
 * Fetch news videos from YouTube
 * - Interest based (Crime, Education, etc.)
 * - Kerala only (via channelId)
 * - Shorts filtered out
 * - API key auto-rotation on quota limit
 */
export const fetchVideosFromYouTube = async ({
  interest,
  channelId,
  language = "ml",
}) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: buildSearchQuery(interest), // Crime news Kerala #Crime -shorts
          channelId,                    // ✅ Kerala news channel only
          type: "video",
          maxResults: 10,
          order: "relevance",
          regionCode: "IN",
          relevanceLanguage: language,
          videoDuration: "medium",      // ✅ removes MOST Shorts
          safeSearch: "strict",
          key: getKey(),
        },
      }
    );

    // Basic cleanup (extra safety against Shorts spam)
    const videos = response.data.items.filter((item) => {
      const title = item.snippet.title.toLowerCase();
      const description = item.snippet.description.toLowerCase();

      return (
        !title.includes("shorts") &&
        !description.includes("#shorts") &&
        !description.includes("#ytshorts")
      );
    });

    return videos;
  } catch (err) {
    const reason =
      err?.response?.data?.error?.errors?.[0]?.reason;

    // 🔁 Auto-rotate API key on quota issues
    if (
      reason === "quotaExceeded" ||
      reason === "dailyLimitExceeded"
    ) {
      console.warn("⚠️ YouTube quota hit. Rotating API key...");
      rotateKey();
      return fetchVideosFromYouTube({ interest, channelId, language });
    }

    console.error("❌ YouTube fetch error:", err.message);
    throw err;
  }
};
