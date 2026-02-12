import cron from "node-cron";
import { fetchKeralaNews } from "../services/fetchKeralaNews.js";

console.log("🕒 news.cron.js loaded");

cron.schedule("*/30 * * * *", () => {
  console.log("📰 Fetching Kerala news...");
  fetchKeralaNews();
});

// 🔥 TEMP: run once on server start
fetchKeralaNews("eng");
fetchKeralaNews("mal");
