import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://skyaura-airways-backend.onrender.com/api/customer/login", { email, password });


      alert("Login Successful!");
      localStorage.setItem("customer", JSON.stringify(res.data.user));
      navigate("/book-ticket"); // Change route as needed
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">SkyAura Airways</div>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtext">Login to manage your bookings</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Username"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <label className="remember-label">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/customer-signup" className="signup-link">Sign up</Link>

          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/customer-signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
