import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminId: "", // Optional: remove if not needed
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

    try {
      const response = await fetch("https://skyaura-airways-backend.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        if (data.user.role !== "admin") {
          setError("Access denied. Not an admin.");
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/admin-dashboard");
        }
      }
    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  };

  return (
    
    <div className="login-page">
      
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Welcome, Admin! Please enter your credentials to access the dashboard.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Remove Admin ID if not required */}
          {/* <input
            type="text"
            name="adminId"
            placeholder="Admin ID"
            className="login-input"
            value={formData.adminId}
            onChange={handleChange}
          /> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span> Remember Me</span>
            </label>
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}

        <hr style={{ margin: "24px 0" }} />

        <p style={{ fontSize: "14px", color: "#888" }}>
          Having trouble? Contact IT support at <b>support@skyaura.com</b>
        </p>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "black" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/admin-signup")}
            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign up
          </span>
        </p>
      </div>
     
    </div>
  );
};

export default AdminLogin;
