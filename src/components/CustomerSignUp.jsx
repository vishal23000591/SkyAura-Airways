import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://skyaura-airways-backend.onrender.com/api/customer/signup', formData);
      alert('Signed up successfully');
      navigate('/customer-login');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">SkyAura Airways</div>
        <div className="login-subtext">Begin your journey with us</div>
        <h2 className="login-title">Customer Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="login-input"
            value={formData.name}
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
          <button className="login-button" type="submit">Sign Up</button>
        </form>
        <div className="signup-text">
          Already have an account? <a className="signup-link" href="/customer-login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default CustomerSignup;
