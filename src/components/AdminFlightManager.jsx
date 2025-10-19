import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminFlightManager = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: "",
    departure: "",
    arrival: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seatsAvailable: "",
    type:""
  });

  useEffect(() => {
    let isMounted = true;
    axios
      .get("https://skyaura-airways-backend.onrender.com/api/flights")
      .then((res) => {
        if (isMounted) setFlights(res.data);
      })
      .catch((err) => console.error("Fetch flights error:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFlight = async (e) => {
  e.preventDefault();
  try {
    const departureTime = new Date(formData.departureTime).toISOString();
    const arrivalTime = new Date(formData.arrivalTime).toISOString();

    const res = await axios.post("https://skyaura-airways-backend.onrender.com/api/flights", {
      ...formData,
      departureTime,
      arrivalTime,
      price: parseInt(formData.price),
      seatsAvailable: parseInt(formData.seatsAvailable),
      type: formData.type === "domestic" ? "Domestic" : "International",
    });

    setFlights((prev) => [...prev, res.data]);
    setFormData({
      flightNumber: "",
      departure: "",
      arrival: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      seatsAvailable: "",
      type: ""
    });
  } catch (err) {
    console.error("Add flight error:", err);
  }
};


  const handleBack = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="admin-flight-manager-page">
      <div className="admin-flight-manager">
        <h2>Admin Flight Manager</h2>

        <form className="login-form" onSubmit={handleAddFlight}>
          <input
            type="text"
            placeholder="Flight Number"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Departure"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Arrival"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
            required
          />

          <input
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Price (INR)"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Seats Available"
            name="seatsAvailable"
            value={formData.seatsAvailable}
            onChange={handleChange}
            required
          />
          <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  required
>
  <option value="">Select Flight Type</option>
  <option value="domestic">Domestic</option>
  <option value="international">International</option>
</select>


          <button type="submit">Add Flight</button>
        </form>

        <div className="flights-list">
          <h3>Available Flights</h3>
          {flights.length === 0 ? (
            <p>No flights added.</p>
          ) : (
            <ul>
              {flights.map((flight, index) => (
                <li key={`${flight.flightNumber}-${index}`}>
                  <strong>{flight.flightNumber}</strong> — {flight.departure} to {flight.arrival} <br />
                  🛫 Departure: {new Date(flight.departureTime).toLocaleString()} <br />
                  🛬 Arrival: {new Date(flight.arrivalTime).toLocaleString()} <br />
                  💺 Seats: {flight.seatsAvailable} | 💸 ₹{flight.price}
                  🌐 Type: {flight.type} 

                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={handleBack}>← Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default AdminFlightManager;
