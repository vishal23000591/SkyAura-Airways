import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frequent Traveler",
      content: "SkyAura's AI booking system saved me 30% on my last trip. The personalized recommendations were spot on!",
      rating: "★★★★★"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Executive",
      content: "The admin dashboard provides incredible insights that help me manage my team's travel efficiently.",
      rating: "★★★★☆"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Travel Blogger",
      content: "I've flown with many airlines, but SkyAura's customer portal is by far the most intuitive and feature-rich.",
      rating: "★★★★★"
    }
  ];

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <p>Trusted by travelers and businesses worldwide</p>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">{testimonial.rating}</div>
            <p className="testimonial-content">"{testimonial.content}"</p>
            <div className="testimonial-author">
              <h4>{testimonial.name}</h4>
              <p>{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;