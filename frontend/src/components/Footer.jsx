import React from 'react';
import './Footer.css';
import logo from "../assets/favicon.ico"; 

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row text-white py-4">

          {/* Column 1: Logo and Intro */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase"><img src={logo} alt="Rentify Logo" style={{ height: "28px" }} />  Home Rentify</h5>
            <p className="small">Your trusted platform for renting dream homes with ease and security.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/properties" className="footer-link">Properties</a></li>
              <li><a href="/login" className="footer-link">Login</a></li>
            </ul>
          </div>

          {/* Column 3: Social Icons */}
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">Follow Us</h6>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <div className="text-center text-white pb-3 small">
          © {new Date().getFullYear()} Rentify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
