import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const Confirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passengerData = location.state?.passengerData;

  useEffect(() => {
    console.log("✅ Received passengerData:", passengerData);
  }, [passengerData]);

  const handleHome = () => navigate("/");

  return (
    <div className="confirm-container">
      <FaCheckCircle className="confirm-icon" />
      <h2 className="confirm-title">Booking Confirmed!</h2>

      {passengerData ? (
        <div className="confirm-details">
          {passengerData.passengers?.map((p, index) => (
            <div key={index}>
              <p><strong>Passenger:</strong> {p.name}</p>
              <p><strong>DOB:</strong> {p.dob}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
              <p><strong>ID Number:</strong> {p.idNumber}</p>
              <hr />
            </div>
          ))}
          <p><strong>Flight ID:</strong> {passengerData.flightId}</p>
          <p><strong>Payment Method:</strong> {passengerData.payment?.method || "N/A"}</p>
          <p><strong>Amount Paid:</strong> ₹{passengerData.payment?.amount || "0"}</p>
        </div>
      ) : (
        <p>No passenger data found.</p>
      )}

      <button className="home-button" onClick={handleHome}>
        <FaHome /> Back to Home
      </button>
    </div>
  );
};

export default Confirm;
