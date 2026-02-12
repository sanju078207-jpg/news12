import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      name,
      email,
      picture,
    } = payload;

    // Find or create user
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        avatar: picture,
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send preferences also
    res.json({
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        language: user.language,
        region: user.region,
        interests: user.interests,
        preferences: user.preferences, // 👈 IMPORTANT
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Google token" });
  }
};
