import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import videoRoutes from "./routes/video.routes.js";
import newsRoutes from "./routes/news.routes.js";

// Cron jobs (important)
import "./jobs/news.cron.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/news", newsRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Video News API is running 🚀");
});

export default app;
