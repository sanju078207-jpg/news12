import express from "express";
import User from "../models/User.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Complete onboarding:
 * - language
 * - interests (for feed)
 * - preferences (for top bar)
 */
router.post("/onboarding", authMiddleware, async (req, res) => {
  try {
    const { interests, preferences, language, region } = req.body;

    // ✅ authMiddleware must set req.userId
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        language,
        region,
        interests,
        preferences,
      },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Onboarding backend error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
