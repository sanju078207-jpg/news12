import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="555352174408-i884984u2vii6203i8efn5umqn57rrrr.apps.googleusercontent.com">
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
