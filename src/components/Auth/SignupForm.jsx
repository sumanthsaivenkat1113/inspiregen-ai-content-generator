import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";   // ✅ Correct default import
import { jwtDecode } from "jwt-decode";
import "./Auth.css";

export default function SignupForm() {
  const { signup, loginWithGoogle, user, loading, error, setError } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  // Clear error when component mounts/unmounts
  useEffect(() => {
    setError && setError(null);
    return () => setError && setError(null);
  }, [setError]);

  // Redirect after signup
  useEffect(() => {
    if (user) {
      setStatus({
        type: "success",
        message: "Signup successful — redirecting…",
      });

      const t = setTimeout(() => navigate("/generate/content"), 800);
      return () => clearTimeout(t);
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      await signup(form);
      // Redirect handled above
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Signup failed" });
    }
  };

  // ⭐ Google OAuth Success
  const handleGoogleSuccess = async (response) => {
    try {
      // const decoded = jwt_decode(response.credential);
      const decoded = jwtDecode(response.credential);

      await loginWithGoogle({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        sub: decoded.sub,
      });
    } catch (err) {
      console.error("Google Signup Error", err);
      setStatus({ type: "error", message: "Google Signup Failed" });
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Sign Up"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>

      {/* ⭐ Google Signup */}
      <div className="google-auth-section">
        <div className="google-divider">or</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() =>
            setStatus({ type: "error", message: "Google Auth Failed" })
          }
        />
      </div>

      {status && (
        <div
          className={`auth-status ${
            status.type === "error" ? "error" : "success"
          }`}
        >
          {status.message}
        </div>
      )}

      {error && <div className="auth-status error">{error}</div>}
    </div>
  );
}
