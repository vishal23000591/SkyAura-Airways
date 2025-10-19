import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-container">
        <img src="/logo.png" alt="SkyAura Logo" className="logo" />
        <span className="brand">SkyAura Airways</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
