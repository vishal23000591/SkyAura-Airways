import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPlane,
  FaUser,
  FaClock,
  FaRupeeSign,
  FaCalendarAlt,
  FaCreditCard,
  FaWallet,
  FaMobileAlt,
  FaArrowLeft
} from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers } = location.state || {};
  const user = JSON.parse(localStorage.getItem("customer"));

  const [activeTab, setActiveTab] = useState('creditCard');
  const [formData, setFormData] = useState({
    passengers: Array(passengers || 1).fill().map(() => ({
      name: '',
      dob: '',
      gender: '',
      idNumber: '',
      seatType: 'Economy',
    })),
    payment: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: '',
      upiId: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!flight || !passengers || !flight._id || !flight.departureTime || !flight.arrivalTime || !flight.price) {
    return (
      <div className="booking-error">
        <MdErrorOutline size={48} className="error-icon" />
        <h2>Invalid Booking</h2>
        <p>Flight or passenger information is missing or incomplete.</p>
        <button 
          className="back-button"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft /> Back to Flights
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const calculateDuration = (departure, arrival) => {
    const diff = new Date(arrival) - new Date(departure);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index][field] = value;
    setFormData({
      ...formData,
      passengers: updatedPassengers
    });
    
    if (errors[`passenger-${index}-${field}`]) {
      const newErrors = {...errors};
      delete newErrors[`passenger-${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const handlePaymentChange = (field, value) => {
    setFormData({
      ...formData,
      payment: {
        ...formData.payment,
        [field]: value
      }
    });
    
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    formData.passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`passenger-${index}-name`] = 'Name is required';
      }
      if (!passenger.dob) {
        newErrors[`passenger-${index}-dob`] = 'Date of birth is required';
      }
      if (!passenger.gender) {
        newErrors[`passenger-${index}-gender`] = 'Gender is required';
      }
      if (!passenger.idNumber.trim()) {
        newErrors[`passenger-${index}-idNumber`] = 'ID is required';
      }
    });
    
    if (activeTab === 'creditCard') {
      if (!formData.payment.cardNumber.trim() || formData.payment.cardNumber.length !== 16) {
        newErrors['cardNumber'] = 'Valid 16-digit card number is required';
      }
      if (!formData.payment.expiry.trim() || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.payment.expiry)) {
        newErrors['expiry'] = 'Valid expiry date (MM/YY) is required';
      }
      if (!formData.payment.cvv.trim() || formData.payment.cvv.length < 3) {
        newErrors['cvv'] = 'Valid CVV is required';
      }
      if (!formData.payment.name.trim()) {
        newErrors['name'] = 'Cardholder name is required';
      }
    } else if (activeTab === 'upi') {
      if (!formData.payment.upiId.trim() || !/^[\w.-]+@\w+$/.test(formData.payment.upiId)) {
        newErrors['upiId'] = 'Valid UPI ID (e.g., name@upi) is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = async () => {
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const bookingData = {
      email: user.email, // ✅ Add this line
      flightId: flight._id,
      flightType: flight.flightType || "Domestic", // Default to Domestic if not provided
      passengers: formData.passengers.map(passenger => ({
        name: passenger.name,
        dob: passenger.dob,
        gender: passenger.gender,
        idNumber: passenger.idNumber,
        seatType: passenger.seatType
      })),
      payment: {
        method: activeTab,
        amount: flight.price * 1.18,
        details: 
          activeTab === 'creditCard' ? {
            cardNumber: formData.payment.cardNumber,
            expiry: formData.payment.expiry,
            name: formData.payment.name
          } : 
          activeTab === 'upi' ? {
            upiId: formData.payment.upiId
          } : {
            note: `${activeTab} payment will be completed externally`
          }
      },
      bookingDate: new Date().toISOString()
    };

    const response = await axios.post('https://skyaura-airways-backend.onrender.com/api/passengers', bookingData);

    setBookingSuccess(true);
    setTimeout(() => {
    navigate("/confirm", {
      state: {
        passengerData: response.data.passengerData, // ✅ ensure response.data has full passenger info
      },
    });
  }, 1500);
  
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Booking failed. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleBack = () => {
    navigate(-1);
  };

  const totalPrice = flight.price * 1.18;

  return (
    <div className="booking-details-container">
      <div className="booking-header">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
        <h2>Complete Your Booking</h2>
      </div>

      <div className="booking-section flight-summary">
        <h3 className="section-title">
          <FaPlane className="section-icon" />
          Flight Details
        </h3>
        
        <div className="flight-card">
          <div className="flight-route">
            <div className="route-info">
              <span className="departure">{flight.departureCode || 'DEL'}</span>
              <div className="duration">
                <div className="duration-line"></div>
                <span>{calculateDuration(flight.departureTime, flight.arrivalTime)}</span>
                <div className="duration-line"></div>
              </div>
              <span className="arrival">{flight.arrivalCode || 'BOM'}</span>
            </div>
            <div className="flight-number">Flight #{flight.flightNumber}</div>
          </div>
          
          <div className="flight-timings">
            <div className="timing">
              <span className="time">{formatTime(flight.departureTime)}</span>
              <span className="date">{formatDate(flight.departureTime)}</span>
              <span className="airport">{flight.departure} Airport</span>
            </div>
            <div className="timing">
              <span className="time">{formatTime(flight.arrivalTime)}</span>
              <span className="date">{formatDate(flight.arrivalTime)}</span>
              <span className="airport">{flight.arrival} Airport</span>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-section passenger-info">
        <h3 className="section-title">
          <FaUser className="section-icon" />
          Passenger Information
        </h3>
        
        {formData.passengers.map((passenger, index) => (
          <div key={index} className="passenger-form">
            <h4>Passenger {index + 1} {index === 0 && '(Primary)'}</h4>
            
            <div className={`form-group ${errors[`passenger-${index}-name`] ? 'error' : ''}`}>
              <label>Full Name*</label>
              <input
                type="text"
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                placeholder="As per government ID"
              />
              {errors[`passenger-${index}-name`] && (
                <span className="error-message">{errors[`passenger-${index}-name`]}</span>
              )}
            </div>
            
            <div className="form-row">
              <div className={`form-group ${errors[`passenger-${index}-dob`] ? 'error' : ''}`}>
                <label>Date of Birth*</label>
                <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors[`passenger-${index}-dob`] && (
                  <span className="error-message">{errors[`passenger-${index}-dob`]}</span>
                )}
              </div>
              
              <div className={`form-group ${errors[`passenger-${index}-gender`] ? 'error' : ''}`}>
                <label>Gender*</label>
                <select
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors[`passenger-${index}-gender`] && (
                  <span className="error-message">{errors[`passenger-${index}-gender`]}</span>
                )}
              </div>
            </div>
            <div className="form-group">
  <label>Seat Type</label>
  <select
    value={passenger.seatType}
    onChange={(e) => handlePassengerChange(index, 'seatType', e.target.value)}
  >
    <option value="Economy">Economy</option>
    <option value="Business">Business</option>
    <option value="First Class">First Class</option>
  </select>
</div>

            
            <div className={`form-group ${errors[`passenger-${index}-idNumber`] ? 'error' : ''}`}>
              <label>Passport/ID Number*</label>
              <input
                type="text"
                value={passenger.idNumber}
                onChange={(e) => handlePassengerChange(index, 'idNumber', e.target.value)}
                placeholder="Enter passport or ID number"
              />
              {errors[`passenger-${index}-idNumber`] && (
                <span className="error-message">{errors[`passenger-${index}-idNumber`]}</span>
              )}
            </div>
          </div>
          
        ))}
      </div>

      <div className="booking-section payment-info">
        <h3 className="section-title">
          <FaCreditCard className="section-icon" />
          Payment Method
        </h3>
        
        <div className="payment-tabs">
          <button
            className={`tab ${activeTab === 'creditCard' ? 'active' : ''}`}
            onClick={() => setActiveTab('creditCard')}
          >
            <FaCreditCard /> Card
          </button>
          <button
            className={`tab ${activeTab === 'upi' ? 'active' : ''}`}
            onClick={() => setActiveTab('upi')}
          >
            <FaMobileAlt /> UPI
          </button>
          <button
            className={`tab ${activeTab === 'wallet' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            <FaWallet /> Wallet
          </button>
          <button
            className={`tab ${activeTab === 'paytm' ? 'active' : ''}`}
            onClick={() => setActiveTab('paytm')}
          >
            <SiPaytm /> Paytm
          </button>
        </div>
        
        <div className="payment-content">
          {activeTab === 'creditCard' && (
            <div className="card-form">
              <div className={`form-group ${errors.cardNumber ? 'error' : ''}`}>
                <label>Card Number*</label>
                <input
                  type="text"
                  value={formData.payment.cardNumber}
                  onChange={(e) => handlePaymentChange('cardNumber', e.target.value.replace(/\D/g, ''))}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>
              
              <div className="form-row">
                <div className={`form-group ${errors.expiry ? 'error' : ''}`}>
                  <label>Expiry Date*</label>
                  <input
                    type="text"
                    value={formData.payment.expiry}
                    onChange={(e) => handlePaymentChange('expiry', e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                </div>
                
                <div className={`form-group ${errors.cvv ? 'error' : ''}`}>
                  <label>CVV*</label>
                  <input
                    type="text"
                    value={formData.payment.cvv}
                    onChange={(e) => handlePaymentChange('cvv', e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
              
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label>Cardholder Name*</label>
                <input
                  type="text"
                  value={formData.payment.name}
                  onChange={(e) => handlePaymentChange('name', e.target.value)}
                  placeholder="Name as on card"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            </div>
          )}
          
          {activeTab === 'upi' && (
            <div className="upi-form">
              <div className={`form-group ${errors.upiId ? 'error' : ''}`}>
                <label>UPI ID*</label>
                <input
                  type="text"
                  value={formData.payment.upiId}
                  onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                  placeholder="name@upi"
                />
                {errors.upiId && <span className="error-message">{errors.upiId}</span>}
              </div>
              <div className="upi-apps">
                <button className="upi-app">
                  <SiPaytm /> Paytm
                </button>
                <button className="upi-app">
                  <SiPhonepe /> PhonePe
                </button>
                <button className="upi-app">
                  <FaMobileAlt /> Other UPI Apps
                </button>
              </div>
            </div>
          )}
          
          {(activeTab === 'wallet' || activeTab === 'paytm') && (
            <div className="wallet-message">
              <p>You will be redirected to {activeTab === 'paytm' ? 'Paytm' : 'your wallet'} app to complete the payment.</p>
              <button className="proceed-button">
                Proceed to {activeTab === 'paytm' ? 'Paytm' : 'Wallet'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="booking-section price-summary">
        <h3 className="section-title">Price Summary</h3>
        <div className="price-details">
          <div className="price-row">
            <span>Base Fare ({passengers} × ₹{(flight.price / passengers).toLocaleString()})</span>
            <span>₹{flight.price.toLocaleString()}</span>
          </div>
          <div className="price-row">
            <span>Taxes & Fees</span>
            <span>₹{(flight.price * 0.18).toLocaleString()}</span>
          </div>
          <div className="price-row">
            <span>Convenience Fee</span>
            <span>₹0</span>
          </div>
          <div className="price-row total">
            <span>Total Amount</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="booking-actions">
        <button 
          className="back-button"
          onClick={handleBack}
          disabled={isSubmitting}
        >
          <FaArrowLeft /> Back
        </button>
        <button
          className={`confirm-button ${isSubmitting ? 'submitting' : ''} ${bookingSuccess ? 'success' : ''}`}
          onClick={handleConfirmBooking}
          disabled={isSubmitting || bookingSuccess}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : bookingSuccess ? (
            'Booking Confirmed!'
          ) : (
            `Pay ₹${totalPrice.toLocaleString()}`
          )}
        </button>
      </div>

      {bookingSuccess && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-animation"></div>
            <h3>Booking Confirmed!</h3>
            <p>Redirecting to confirmation page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;