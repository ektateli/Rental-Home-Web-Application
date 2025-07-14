import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import homeBg from '../assets/04.jpg';
import axios from 'axios';
import './Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Contact from './Contact';


const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => {
        console.log("Fetched properties:", res.data);
        setProperties(res.data);
      })
      .catch(err => console.error('Failed to fetch:', err));
  }, []);

  return (
    <>
   
      {/* Header */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <h1>Find Your Dream Home with Rentify</h1>
      </div>

      {/* Property Grid */}
      <div className="container properties-section">
        <h2>Latest Properties</h2>
        <div className="row g-4">
          {properties.slice(0, 6).map((property) => (
            <div key={property.id} className="col-12 col-sm-6 col-md-4 d-flex">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* 👇 Services Section 👇 */}
      <div className="container services-section my-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-house-door fs-1 text-primary mb-3"></i>
            <h5>Property Listings</h5>
            <p>View and explore a variety of verified rental properties tailored to your needs.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-cash-coin fs-1 text-success mb-3"></i>
            <h5>Easy Payments</h5>
            <p>Secure and easy rent payments with transparent transaction history.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-person-lines-fill fs-1 text-warning mb-3"></i>
            <h5>Owner Support</h5>
            <p>Manage listings and communicate directly with potential tenants.</p>
          </div>
        </div>
      </div>
      <div>
        <Contact />
      </div>
    
    </>
  );
};

export default Home;
