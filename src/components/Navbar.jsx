import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="SkyAura Logo" className="logo" />
        <span className="brand">SkyAura Airways</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/customer-login">Customer Login</Link>
        <Link to="/admin-login">Admin Login</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;