import React, { useState } from "react";

const SentimentAnalysis = () => {
  const [feedbacks, setFeedbacks] = useState([
    "Great service!",
    "The flight was delayed",
    "Awesome crew and staff",
    "Not satisfied with the food",
    "Comfortable and smooth ride",
  ]);

  const analyzeSentiment = (text) => {
    const positiveWords = ["great", "awesome", "comfortable", "smooth", "good", "nice", "friendly"];
    const negativeWords = ["delayed", "not", "bad", "poor", "unsatisfied"];

    const lowerText = text.toLowerCase();
    let score = 0;

    positiveWords.forEach((word) => {
      if (lowerText.includes(word)) score++;
    });

    negativeWords.forEach((word) => {
      if (lowerText.includes(word)) score--;
    });

    if (score > 0) return "😊 Positive";
    if (score < 0) return "☹️ Negative";
    return "😐 Neutral";
  };

  return (
    <div className="login-container">
      <h2>Sentiment Analysis</h2>
      <div className="login-form">
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index}>
              <strong>"{feedback}"</strong> → {analyzeSentiment(feedback)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
