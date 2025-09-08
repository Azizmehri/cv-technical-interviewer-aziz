// get user information for every component
import React, { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);

        // Optional: check token expiration (if your token has 'exp' claim)
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          console.warn("Token expired, removing it");
          localStorage.removeItem("authToken");
          setToken(null);
          setUserId(null);
        } else {
          setUserId(decoded.user_id);
          setUserEmail(decoded.user_email);
          setToken(savedToken);
        }
      } catch (err) {
        console.error("Invalid token:", err.message);
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userEmail, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
