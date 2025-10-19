import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to SkyAura Airways</h1>
        <p className="hero-subtitle">
          Redefining air travel with cutting-edge AI for seamless booking and smart operations.
        </p>

        <div className="hero-buttons">
          <Link to="/customer-login" className="hero-btn">Customer Portal</Link>
          <Link to="/admin-login" className="hero-btn admin">Admin Dashboard</Link>
          <Link to="/flight-search" className="hero-btn secondary">Search Flights</Link>
        </div>
        
        <div className="hero-stats">
  <div className="stat-item">
    <div className="stat-number">500+</div>
    <div className="stat-label">Daily Flights</div>
  </div>
  <div className="stat-item">
    <div className="stat-number">1M+</div>
    <div className="stat-label">Happy Customers</div>
  </div>
  <div className="stat-item">
    <div className="stat-number">50+</div>
    <div className="stat-label">Destinations</div>
  </div>
</div>

        <div className="hero-cards">
          <div className="hero-card">
            <h3>AI-Powered Booking</h3>
            <p>Book flights faster with intelligent suggestions and dynamic pricing.</p>
          </div>
          <div className="hero-card">
            <h3>Real-Time Analytics</h3>
            <p>Monitor trends, traffic, and customer insights from a single view.</p>
          </div>
          <div className="hero-card">
            <h3>Secure Customer Access</h3>
            <p>Encrypted portals for booking, cancellation, and flight tracking.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;