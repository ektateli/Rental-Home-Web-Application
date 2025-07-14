import React from 'react';
import './About.css'; // Optional for custom styling

const About = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">About Rentify</h1>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="About Us"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h4>Who We Are</h4>
          <p>
            Rentify is a trusted rental home platform that bridges the gap between property owners and tenants.
            We aim to simplify the process of finding and renting a home through a secure, user-friendly, and efficient online experience.
          </p>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-4">
          <i className="bi bi-house-door-fill fs-1 text-primary mb-2"></i>
          <h5>Wide Listings</h5>
          <p>Explore a variety of verified homes across cities with detailed info and photos.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-person-check-fill fs-1 text-success mb-2"></i>
          <h5>Trusted Owners</h5>
          <p>Our platform ensures listings from genuine property owners with verified details.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-calendar-check fs-1 text-warning mb-2"></i>
          <h5>Smart Booking</h5>
          <p>Book tours, send inquiries, and finalize deals—all from your dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
