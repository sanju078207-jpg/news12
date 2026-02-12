import dotenv from "dotenv";

// 🔥 ENSURE env is loaded even in ESM import chains
dotenv.config();

const rawKeys = process.env.YOUTUBE_API_KEYS;

if (!rawKeys) {
  console.error("❌ Missing YOUTUBE_API_KEYS in environment");
  process.exit(1);
}

const keys = rawKeys.split(",").map(k => k.trim());
let index = 0;

export const getKey = () => keys[index];

export const rotateKey = () => {
  index = (index + 1) % keys.length;
  console.log("🔁 Rotated YouTube API key");
};
