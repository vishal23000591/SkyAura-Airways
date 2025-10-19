import React from "react";

function WeatherInfo({ label, weather }) {
  if (!weather) return null;

  return (
    <div className="weather-info">
      <h3>{label} Weather</h3>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherInfo;
