import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("customer"));
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) {
      navigate("/customer-login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `https://skyaura-airways-backend.onrender.com/api/bookings/${encodeURIComponent(userEmail)}`
        );
        setBookings(response.data);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail, navigate]);

  if (!userEmail) return null;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        
        <p className="error-message">{error}</p>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const handleBookingClick = (bookingId) => {
    navigate(`/booking-details/${bookingId}`);
  };


  return (
    
   
    <div className="my-bookings-container">
       
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <p className="bookings-count">{bookings.length} booking(s) found</p>
      </div>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <button
            className="book-flight-button"
            onClick={() => navigate("/flights")}
          >
            Book a Flight
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="booking-card"
              onClick={() => handleBookingClick(booking._id)}
            >
              <div className="card-header">
                <h3>Booking #{index + 1}</h3>
                <span className="booking-date">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </span>
              </div>

              {/* ✅ Flight Info */}
              <div className="card-section flight-info">
                <h4>Flight Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Flight Number:</span>
                  <span>{booking.flightId?.flightNumber || "N/A"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">From:</span>
                  <span>{booking.flightId?.departure || "N/A"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">To:</span>
                  <span>{booking.flightId?.arrival || "N/A"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Departure Time:</span>
                  <span>
                    {booking.flightId?.departureTime
                      ? new Date(booking.flightId.departureTime).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Arrival Time:</span>
                  <span>
                    {booking.flightId?.arrivalTime
                      ? new Date(booking.flightId.arrivalTime).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Seat:</span>
                  <span>{booking.seatNumber || "N/A"}</span>
                </div>
              </div>

              {/* 👤 Passenger Details */}
              {booking.passengers.map((passenger, idx) => (
  <div key={idx} className="passenger-details">
    <div className="detail-row">
      <span className="detail-label">Name:</span>
      <span>{passenger.name}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">DOB:</span>
      <span>{passenger.dob || "N/A"}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Gender:</span>
      <span>{passenger.gender || "N/A"}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">ID Number:</span>
      <span>{passenger.idNumber || "N/A"}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Seat Type:</span>
      <span>{passenger.seatType || "N/A"}</span>
    </div>
    {idx < booking.passengers.length - 1 && <hr />}
  </div>
))}


              {/* 💳 Payment Info */}
              <div className="card-section payment-section">
                <h4>Payment Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="payment-amount">
                    ₹{booking.payment?.amount?.toLocaleString() || "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Method:</span>
                  <span className="payment-method">
                    {booking.payment?.method || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
     
    </div>
  );
}

export default MyBookings;
