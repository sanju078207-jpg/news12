import User from "../models/User.model.js";

export const completeOnboarding = async (req, res) => {
  try {
    const {
      language,
      interests,
      region,
      preferences, // 👈 NEW
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        language,
        interests,
        region,
        preferences, // 👈 SAVED IN DB
      },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Onboarding failed" });
  }
};
