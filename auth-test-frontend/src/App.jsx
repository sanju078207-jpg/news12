import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Onboarding from "./Onboarding";
import Home from "./Home";

function App() {
  return (
    <Routes>
      {/* Auth routes (NO TopBar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* App routes (WITH TopBar inside pages) */}
      <Route path="/home" element={<Home />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
