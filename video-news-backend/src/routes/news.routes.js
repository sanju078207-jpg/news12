import express from "express";
import Article from "../models/Article.model.js";

const router = express.Router();

/**
 * GET /api/news/kerala
 * Returns latest Kerala news articles (last 24 hrs only)
 */
router.get("/kerala", async (req, res) => {
  try {
    const articles = await Article.find({
      region: "kerala",
    })
      .sort({ publishedAt: -1 })
      .limit(20);

    res.json(articles);
  } catch (error) {
    console.error("Error fetching Kerala news:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
