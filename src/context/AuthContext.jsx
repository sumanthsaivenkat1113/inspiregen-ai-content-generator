import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { googleLogout as googleSdkLogout } from "@react-oauth/google";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("inspiregen_current_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save user in localStorage
  useEffect(() => {
    if (user) localStorage.setItem("inspiregen_current_user", JSON.stringify(user));
    else localStorage.removeItem("inspiregen_current_user");
  }, [user]);

  // Email Signup
  const signup = async (form) => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.signup(form);
      setUser(u);
      return u;
    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Email Login
  const login = async (form) => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.login(form);
      setUser(u);
      return u;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ⭐ GOOGLE LOGIN
  const loginWithGoogle = async (googleUser) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.googleSignin(googleUser);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Normal Logout
  const logout = async () => {
    setLoading(true);
    try {
      await authService.signout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Google Logout
  const googleLogout = async () => {
    try {
      googleSdkLogout(); // Google SDK logout
      setUser(null);
      localStorage.removeItem("inspiregen_current_user");
    } catch (err) {
      console.error("Google Logout Error", err);
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    loginWithGoogle,
    googleLogout,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
