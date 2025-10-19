// src/components/AirportsSelector.jsx
import React from "react";

function AirportsSelector({ airports, setSource, setDestination }) {
  return (
    <div className="selector-container">
      <div className="dropdown">
        <label htmlFor="source">Select Source Airport:</label>
        <select
          id="source"
          onChange={(e) =>
            setSource(airports.find((a) => a.code === e.target.value))
          }
        >
          <option value="">-- Source --</option>
          {airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.name} ({airport.code})
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="destination">Select Destination Airport:</label>
        <select
          id="destination"
          onChange={(e) =>
            setDestination(airports.find((a) => a.code === e.target.value))
          }
        >
          <option value="">-- Destination --</option>
          {airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.name} ({airport.code})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AirportsSelector;
