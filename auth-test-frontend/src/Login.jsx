import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // 👈 ADD THIS
import logo from "./assets/logo.png";
import "./index.css";

function Login() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 USE CONTEXT

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { token: credentialResponse.credential }
      );

      // 👇 Send whole response to context
      login(res.data);

      const { user } = res.data;

      // redirect logic stays same
      if (!user.interests || user.interests.length === 0) {
        navigate("/onboarding");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-container ${animate ? "active" : ""}`}>
        
        {/* Logo */}
        <img src={logo} alt="Global Chronicle" className="auth-logo" />

        {/* Google Login */}
        <div className="google-btn-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={(err) => {
              console.error("Google OAuth error:", err);
              alert("Google sign-in failed. Check console.");
            }}
            useOneTap={false}
          />
        </div>

        {/* Promo text */}
        <div className="promo-text">
          <h2 className="stay-connected">Stay Connected</h2>
          <p className="to-what-matters">to What Matters</p>
        </div>

      </div>
    </div>
  );
}

export default Login;
