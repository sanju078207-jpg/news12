import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getHomeVideos } from "../controllers/video.controller.js";
import Video from "../models/Video.model.js";

const router = express.Router();

/**
 * Home video carousel API
 * GET /api/videos/home
 */
router.get("/home", authMiddleware, getHomeVideos);

export default router;
