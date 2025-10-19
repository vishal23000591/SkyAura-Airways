// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// 🔧 UI components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";

// 🧑‍💻 Auth and User/Admin Pages
import CustomerLogin from "./components/CustomerLogin";
import AdminLogin from "./components/AdminLogin";
import AdminSignUp from "./components/AdminSignUp";
import AdminDashboard from "./components/AdminDashboard";
import AdminFlightManager from "./components/AdminFlightManager";
import SentimentAnalysis from "./components/SentimentAnalysis";
import TicketBooking from "./components/TicketBooking";
import CustomerSignup from "./components/CustomerSignUp";
import BookingDetails from "./components/BookingDetails";

// 🧠 AI + ML Routing & Map Features
import AirportsSelector from "./components/AirportsSelector";
import RoutingMap from "./components/RoutingMap";
import WeatherInfo from "./components/WeatherInfo";
import SuggestionsPanel from "./components/SuggestionsPanel";
import DelayPredictor from "./components/DelayPredictor";
import ThreeDMap from "./components/ThreeDMap";

// 📊 Data and Services
import airportData from "./data/airports";
import { getWeatherByCoords } from "./services/weatherService";
import Confirm from "./components/Confirm";
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import MyBookings from './components/MyBookings';
import Analytics from "./components/Analytics";

// 💄 Styles
import "./index.css";

const App = () => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [srcWeather, setSrcWeather] = useState(null);
  const [destWeather, setDestWeather] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [distance, setDistance] = useState(null);

  const toRadians = (deg) => (deg * Math.PI) / 180;

  const calculateDistance = (src, dest) => {
    const R = 6371;
    const dLat = toRadians(dest.lat - src.lat);
    const dLon = toRadians(dest.lon - src.lon);
    const lat1 = toRadians(src.lat);
    const lat2 = toRadians(dest.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const handleShowRoute = () => {
    if (source && destination) {
      setShowRoute(true);
      setDistance(calculateDistance(source, destination));
    }
  };

  useEffect(() => {
    async function fetchWeather() {
      if (source) {
        const weather = await getWeatherByCoords(source.lat, source.lon);
        setSrcWeather(weather);
      }
      if (destination) {
        const weather = await getWeatherByCoords(destination.lat, destination.lon);
        setDestWeather(weather);
      }
    }
    fetchWeather();
  }, [source, destination]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Routes>
        {/* 🏠 Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Testimonials />
              <Newsletter />
              <Features />
              <Footer />
            </>
          }
        />

        {/* 👤 Auth Routes */}
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />

        {/* 🧑‍✈️ Admin Pages */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/flight-manager" element={<AdminFlightManager />} />
        <Route path="/admin/sentiment-analysis" element={<SentimentAnalysis />} />

        {/* 🎫 Ticketing */}
        <Route path="/book-ticket" element={<TicketBooking />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<Contact />} />
<Route path="/bookings" element={<MyBookings />} />
<Route path="/admin/analytics" element={<Analytics />} />


        {/* 🧠 Smart Routing Page */}
        <Route
          path="/admin/routing"
          element={
            <div className="app">
              <h1 className="title">SkyAura Route Planner ✈️</h1>

              <AirportsSelector
                airports={airportData}
                setSource={setSource}
                setDestination={setDestination}
              />

              <button
                className="show-route-btn"
                onClick={handleShowRoute}
                disabled={!source || !destination}
              >
                Show Route
              </button>

              {showRoute && (
                <>
                  <div className="map-section">
                    <RoutingMap source={source} destination={destination} />
                  </div>

                  <div className="info-section">
                    <h3>Route Info</h3>
                    <p>
                      <strong>From:</strong> {source.name} <br />
                      <strong>To:</strong> {destination.name} <br />
                      <strong>Distance:</strong> {distance} km
                    </p>
                  </div>

                  <div className="info-section weather-container">
                    <WeatherInfo label="Source" weather={srcWeather} />
                    <WeatherInfo label="Destination" weather={destWeather} />
                  </div>

                  <SuggestionsPanel srcWeather={srcWeather} destWeather={destWeather} />

                  {srcWeather && destWeather && (
                    <DelayPredictor
                      srcWeather={srcWeather}
                      destWeather={destWeather}
                    />
                  )}

                  <div className="info-section">
                    <h3>3D Flight Path Visualizer</h3>
                    <div style={{ height: "500px" }}>
                      <ThreeDMap source={source} destination={destination} />
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
