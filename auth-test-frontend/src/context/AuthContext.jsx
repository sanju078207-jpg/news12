import { createContext, useContext, useEffect, useState } from "react";

// Create context
const AuthContext = createContext(null);

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Login handler (called after Google login success)
  const login = (authData) => {
    const { token, user } = authData;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  // Update user (used after onboarding)
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
