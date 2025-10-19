import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title animate-fade-in">About SkyAura Airways</h1>
          
          <div className="about-section animate-slide-up delay-100">
            <h2 className="about-subtitle">Our Vision</h2>
            <p className="about-text">
              To revolutionize air travel through cutting-edge technology and unparalleled customer service, 
              making every journey seamless, efficient, and memorable.
            </p>
          </div>

          <div className="about-section animate-slide-up delay-200">
            <h2 className="about-subtitle">Who We Are</h2>
            <p className="about-text">
              Founded in 2023, SkyAura Airways is India's fastest-growing airline, combining 
              operational excellence with digital innovation. Our fleet of 32 modern aircraft 
              serves 48 destinations across 12 countries.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-card animate-slide-up delay-300">
              <div className="highlight-icon">✈️</div>
              <h3>250+</h3>
              <p>Daily Flights</p>
            </div>
            
            <div className="highlight-card animate-slide-up delay-350">
              <div className="highlight-icon">🌎</div>
              <h3>48</h3>
              <p>Destinations</p>
            </div>
            
            <div className="highlight-card animate-slide-up delay-400">
              <div className="highlight-icon">👍</div>
              <h3>98.7%</h3>
              <p>On-time Performance</p>
            </div>
          </div>

          <div className="about-section animate-fade-in delay-500">
            <h2 className="about-subtitle">Our Commitment</h2>
            <p className="about-text">
              We invest in sustainable aviation technology, employee training, and customer experience 
              innovations to ensure SkyAura remains at the forefront of the industry. Our AI-powered 
              flight optimization systems reduce fuel consumption by up to 15% compared to industry averages.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;