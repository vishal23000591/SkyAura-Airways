import React from "react";

const Features = () => {
  return (
    <section className="features">
      <h2>Our Features</h2>
      <p className="features-subtitle">Powering seamless travel and intelligent airline operations.</p>
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon">✈️</div>
          <h3>Smart Ticket Booking</h3>
          <p>Book flights easily with AI-powered suggestions and real-time availability.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Admin Analytics</h3>
          <p>View dashboards with sentiment analysis, flight predictions, and customer trends.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛣️</div>
          <h3>Dynamic Flight Routing</h3>
          <p>Optimize routes using ML to save time, fuel, and reduce emissions.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payments</h3>
          <p>Bank-grade encryption for all transactions with multiple payment options.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Global Coverage</h3>
          <p>Connect to major cities worldwide with our extensive network.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⏱️</div>
          <h3>Real-time Updates</h3>
          <p>Instant notifications for flight changes, delays, and gate information.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;