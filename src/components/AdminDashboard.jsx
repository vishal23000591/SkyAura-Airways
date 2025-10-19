import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">SkyAura Admin</h2>
        <nav className="admin-nav">
           <Link to="/">Home</Link>
          <Link to="/admin/flight-manager">Flight Manager</Link>
          <Link to="/admin/sentiment-analysis">Sentiment Analysis</Link>
          <Link to="/admin/routing">Routing</Link>
          <Link to="/admin/analytics">Analytics</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <h1 className="dashboard-heading">Welcome, Admin ✈️</h1>
        <div className="dashboard-cards">
          <div className="glass-card">
            <h2>Flight Manager</h2>
            <p>Manage and schedule flights efficiently.</p>
            <Link to="/admin/flight-manager" className="glass-button">Open</Link>
          </div>
          <div className="glass-card">
            <h2>Sentiment Analysis</h2>
            <p>Analyze customer reviews in real-time.</p>
            <Link to="/admin/sentiment-analysis" className="glass-button">Open</Link>
          </div>
          <div className="glass-card">
            <h2>Routing</h2>
            <p>Plan optimized flight paths using AI.</p>
            <Link to="/admin/routing" className="glass-button">Open</Link>
          </div>
          <div className="glass-card">
            <h2>Analytics</h2>
            <p>Visualize booking trends and operations.</p>
            <Link to="/admin/analytics" className="glass-button">Open</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
