// src/components/DelayPredictor.jsx
import React from "react";

const DelayPredictor = ({ srcWeather, destWeather }) => {
  const checkDelay = (weather) => {
    if (!weather) return "Unknown";
    const { wind, weather: condition } = weather;

    if (wind?.speed > 10 || condition[0]?.main === "Rain" || condition[0]?.main === "Snow") {
      return "⚠️ High Delay Risk";
    } else if (wind?.speed > 5) {
      return "⚠️ Moderate Delay Risk";
    } else {
      return "✅ On-Time Likely";
    }
  };

  return (
    <div className="delay-predictor">
      <h3>🕒 Delay Prediction</h3>
      <p><strong>Source:</strong> {checkDelay(srcWeather)}</p>
      <p><strong>Destination:</strong> {checkDelay(destWeather)}</p>
    </div>
  );
};

export default DelayPredictor;
