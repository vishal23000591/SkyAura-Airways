import React from "react";
import calculateRoute from "../utils/calculateRoute";

function RouteInfo({ source, destination }) {
  if (!source || !destination) return null;

  const distance = calculateRoute(source.lat, source.lon, destination.lat, destination.lon);

  return (
    <div className="info">
      <p><strong>Distance:</strong> {distance.toFixed(2)} km</p>
    </div>
  );
}

export default RouteInfo;
