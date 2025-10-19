import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Trim inputs
    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      const response = await fetch("https://skyaura-airways-backend.onrender.com/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmedData, role: "admin" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        alert("Signup successful! Please login.");
        setFormData({ username: "", email: "", password: "" }); // clear form
        navigate("/admin-login");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Admin Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="login-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}

        <p style={{ marginTop: "20px", fontSize: "14px", color: "black" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin-login")}
            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUp;
