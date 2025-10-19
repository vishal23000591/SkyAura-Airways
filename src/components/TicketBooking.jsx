import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlane, FaSearch, FaUser, FaClock, FaChair, FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaPercent } from "react-icons/fa";
import Footer from "./Footer";
// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
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

// Main Ticket Booking Component
const TicketBooking = () => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  
  const [featuredDestinations] = useState([
    { city: "Dubai", price: "₹15,999", image: "/dubai.jpg", rating: 4.8 },
    { city: "Bali", price: "₹12,499", image: "/bali.jpg", rating: 4.7 },
    { city: "Paris", price: "₹24,999", image: "/paris.jpg", rating: 4.9 },
  ]);

  const [specialOffers] = useState([
    { title: "Early Bird Special", discount: "15%", code: "EARLY15", expires: "2023-12-31" },
    { title: "Family Package", discount: "20%", code: "FAMILY20", expires: "2023-11-30" },
    { title: "First Flight", discount: "10%", code: "WELCOME10", expires: "2023-12-15" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://skyaura-airways-backend.onrender.com/api/flights")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const cleanFlights = res.data.filter(
            (f) => f.departure && f.arrival && f.departureTime && f.arrivalTime
          );
          setFlights(cleanFlights);
        } else {
          console.error("Invalid flights response:", res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching flights:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredFlights = flights
    .filter((flight) => {
      const matchesRoute = 
        flight?.departure?.toLowerCase().includes(from.toLowerCase()) &&
        flight?.arrival?.toLowerCase().includes(to.toLowerCase());
      
      if (departureDate) {
        const flightDate = new Date(flight.departureTime).toISOString().split('T')[0];
        return matchesRoute && flightDate === departureDate;
      }
      return matchesRoute;
    })
    .filter(flight => flight.price >= priceRange[0] && flight.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") return (new Date(a.arrivalTime) - new Date(a.departureTime)) - 
                                      (new Date(b.arrivalTime) - new Date(b.departureTime));
      if (sortBy === "departure") return new Date(a.departureTime) - new Date(b.departureTime);
      return 0;
    });

  const formatDuration = (departure, arrival) => {
    const diff = new Date(arrival) - new Date(departure);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleBookNow = (flight) => {
    navigate("/booking-details", {
      state: {
        flight: flight,
        passengers: passengers
      }
    });
  };

  return (
    <div className="app-container">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Fly Beyond Imagination</h1>
          <p>Experience premium travel with SkyAura Airways</p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaPlane className="stat-icon" />
              <span>50+ Destinations</span>
            </div>
            <div className="stat-item">
              <FaStar className="stat-icon" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="stat-item">
              <FaPercent className="stat-icon" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Container */}
      <div className="ticket-booking-container">
        <h2 className="ticket-booking-title">Search and Book Flights</h2>

        {/* Enhanced Search Section */}
        <div className="search-section">
          {/* From Input */}
          <div className="search-input">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="From (City or Airport)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          {/* To Input */}
          <div className="search-input">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              placeholder="To (City or Airport)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {/* Date Input */}
          <div className="search-input">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              placeholder="Departure Date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Passenger Select */}
          <div className="search-input passenger-select-container">
            <FaUser className="input-icon" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>

          <button className="search-button">
            <FaSearch /> Search Flights
          </button>
        </div>

        {/* Results Header with Sorting */}
        <div className="results-header">
          <h3>{filteredFlights.length} Flights Found</h3>
          <div className="sort-filter-container">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="price">Sort by: Price (Low to High)</option>
              <option value="duration">Sort by: Duration</option>
              <option value="departure">Sort by: Departure Time</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Flight Results */}
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Finding the best flights for you...</p>
          </div>
        ) : filteredFlights.length > 0 ? (
          <div className="flight-cards">
            {filteredFlights.map((flight) => (
              <div key={flight._id} className="flight-card">
                <div className="flight-header">
                  <div className="airline-info">
                    <FaPlane className="flight-icon" />
                    <h4>{flight.departure} → {flight.arrival}</h4>
                  </div>
                  <span className="flight-number">{flight.flightNumber}</span>
                  <span className="flight-duration">
                    {formatDuration(flight.departureTime, flight.arrivalTime)}
                  </span>
                </div>
                <div className="flight-details">
                  <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <div>
                      <p className="detail-label">Departure</p>
                      <p className="detail-value">{new Date(flight.departureTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <div>
                      <p className="detail-label">Arrival</p>
                      <p className="detail-value">{new Date(flight.arrivalTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaChair className="detail-icon" />
                    <div>
                      <p className="detail-label">Seats Available</p>
                      <p className="detail-value">{flight.seatsAvailable}</p>
                    </div>
                  </div>
                  <div className="detail-item price-item">
                    <FaRupeeSign className="detail-icon" />
                    <div>
                      <p className="detail-label">Price</p>
                      <p className="detail-value price">₹{flight.price.toLocaleString()}</p>
                      <p className="price-per-person">(₹{(flight.price/passengers).toLocaleString()} per person)</p>
                    </div>
                  </div>
                </div>
                <button
                  className="book-button"
                  onClick={() => handleBookNow(flight)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-flights-found">
            <h4>No flights found matching your criteria</h4>
            <p>Try adjusting your search filters or broadening your search</p>
          </div>
        )}

        {/* Featured Destinations */}
        <div className="featured-destinations">
          <h3>Featured Destinations</h3>
          <p className="section-subtitle">Discover our most popular routes</p>
          <div className="destination-cards">
            {featuredDestinations.map((dest, index) => (
              <div key={index} className="destination-card">
                <div className="destination-image" style={{ backgroundImage: `url(${dest.image})` }}>
                  <div className="destination-rating">
                    <FaStar className="star-icon" />
                    <span>{dest.rating}</span>
                  </div>
                </div>
                <div className="destination-info">
                  <h4>{dest.city}</h4>
                  <p>Starting from {dest.price}</p>
                  <button className="explore-button">Explore Packages</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="special-offers-section">
          <div className="offers-container">
            <h3>Exclusive Special Offers</h3>
            <p className="section-subtitle">Limited time deals for our valued customers</p>
            <div className="offer-cards">
              {specialOffers.map((offer, index) => (
                <div key={index} className="offer-card">
                  <div className="offer-badge">{offer.discount} OFF</div>
                  <h4>{offer.title}</h4>
                  <p>Use code: <span className="offer-code">{offer.code}</span></p>
                  <p className="offer-expiry">Expires: {new Date(offer.expires).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <button className="offer-button">Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h3>What Our Customers Say</h3>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "SkyAura Airways made my travel experience seamless. The crew was exceptionally professional and the in-flight amenities were top-notch!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <p className="author-name">Rahul Sharma</p>
                  <p className="author-location">Mumbai, India</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "I've flown with many airlines, but SkyAura stands out for their customer service and comfort. Will definitely fly with them again!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <p className="author-name">Priya Patel</p>
                  <p className="author-location">Delhi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-container">
            <h3>Stay Updated with Our Deals</h3>
            <p>Subscribe to our newsletter for exclusive offers and travel tips</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subscribe-button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default TicketBooking;