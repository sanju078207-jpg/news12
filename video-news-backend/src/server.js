import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Connect DB → then start server
mongoose
  .connect(process.env.MONGO_URI, {
    family: 4,
  })
  .then(() => {
    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err.message);
  });
