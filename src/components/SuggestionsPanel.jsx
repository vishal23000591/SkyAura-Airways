// src/components/SuggestionPanel.jsx
import React from "react";

function SuggestionPanel({ source, destination }) {
  if (!source || !destination) return null;

  const suggestions = [];

  // Simple static suggestion logic (can be expanded later)
  if (source.code === "DEL" && destination.code === "BOM") {
    suggestions.push("Try early morning flights for cheaper rates.");
    suggestions.push("Consider flying via Jaipur (JAI) for cost savings.");
  }

  if (source.code === "BLR" && destination.code === "MAA") {
    suggestions.push("Nonstop flights are usually cheaper on weekdays.");
    suggestions.push("Consider using regional airlines like StarAir.");
  }

  if (source.code === destination.code) {
    suggestions.push("Source and destination are same. Please select different airports.");
  }

  // Default suggestion
  if (suggestions.length === 0) {
    suggestions.push("Try adjusting your travel dates or check nearby airports.");
  }

  return (
    <div className="suggestion-panel">
      <h3>AI Travel Suggestions ✈️</h3>
      <ul>
        {suggestions.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionPanel;
