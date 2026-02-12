import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // 👈 ADD THIS
import "./Onboarding.css";

const interestsList = [
  "Crime",
  "Sports",
  "Movies",
  "Education",
  "Jobs",
  "Technology",
  "Weather",
];

function Onboarding() {
  const [language, setLanguage] = useState("ml");
  const [preferences, setPreferences] = useState([]);

  const navigate = useNavigate();
  const { updateUser } = useAuth(); // 👈 CONTEXT

  const togglePreference = (item) => {
    setPreferences((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleContinue = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/user/onboarding",
        {
          language,
          region: "Kerala",

          // backend usage
          interests: preferences,
          preferences: preferences,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ IMPORTANT: sync updated user into AuthContext
      updateUser(res.data.user);

      navigate("/home");
    } catch (err) {
      console.error("Onboarding failed", err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container active">
        <h2 className="onboard-title">Select your preferences</h2>
        <p className="onboard-subtitle">
          Personalize your news experience
        </p>

        {/* Language */}
        <div className="onboard-section">
          <p className="section-label">Language</p>
          <div className="option-row">
            <button
              className={`option-btn ${
                language === "ml" ? "active" : ""
              }`}
              onClick={() => setLanguage("ml")}
            >
              Malayalam
            </button>
            <button
              className={`option-btn ${
                language === "en" ? "active" : ""
              }`}
              onClick={() => setLanguage("en")}
            >
              English
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="onboard-section">
          <p className="section-label">Your News Interests</p>
          <div className="chips-grid">
            {interestsList.map((item) => (
              <button
                key={item}
                className={`chip ${
                  preferences.includes(item) ? "selected" : ""
                }`}
                onClick={() => togglePreference(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Continue */}
        <button
          className="continue-btn"
          disabled={preferences.length === 0}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
