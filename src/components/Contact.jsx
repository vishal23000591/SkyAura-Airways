import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      
      <div className="contact-container">
        <div className="contact-content">
          <h1 className="contact-title animate-fade-in">Contact SkyAura</h1>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card animate-slide-up delay-100">
                <div className="contact-icon">📞</div>
                <div>
                  <h3 className="contact-subtitle">Phone Support</h3>
                  <p className="contact-text">+91 98765 43210</p>
                  <p className="contact-hours">24/7 Customer Service</p>
                </div>
              </div>

              <div className="contact-card animate-slide-up delay-200">
                <div className="contact-icon">📧</div>
                <div>
                  <h3 className="contact-subtitle">Email Us</h3>
                  <p className="contact-text">support@skyauraairways.com</p>
                  <p className="contact-text">corporate@skyauraairways.com</p>
                </div>
              </div>

              <div className="contact-card animate-slide-up delay-300">
                <div className="contact-icon">📍</div>
                <div>
                  <h3 className="contact-subtitle">Headquarters</h3>
                  <p className="contact-text">SkyAura Tower, Airport Road</p>
                  <p className="contact-text">Bengaluru, Karnataka 560037, India</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container animate-slide-up delay-400">
              <h3 className="contact-subtitle">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="contact-message animate-fade-in delay-500">
            <h3 className="contact-subtitle">We're Here to Help</h3>
            <p className="contact-text">
              Our customer support team typically responds within 2 hours during business hours.
              For urgent flight-related inquiries, please call our 24/7 support line.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Contact;