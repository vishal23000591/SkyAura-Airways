import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for exclusive deals and travel tips</p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;