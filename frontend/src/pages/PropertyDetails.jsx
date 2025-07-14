import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();
  const tenantId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => {
        console.error('Error fetching property:', err);
        alert('Failed to load property');
      });
  }, [id]);

  const handleBookNow = async () => {
    setIsBooking(true);
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', {
        tenant_id: tenantId,
        property_id: id,
        booking_date: new Date().toISOString().slice(0, 10),
      });

      const bookingId = res.data.bookingId;
      alert('Booking successful!');
      navigate(`/booking/${bookingId}`);
    } catch (err) {
      if (err.response?.status === 409) {
        alert('You have already booked this property.');
      } else {
        alert('Booking failed.');
        console.error('Booking error:', err);
      }
    } finally {
      setIsBooking(false);
    }
  };

  if (!property) return <p className="loading-text">Loading...</p>;

  return (
    <div className="property-details-container">
      <div className="property-banner">
        <img
          src={property.image_url}
          alt={property.title}
          onError={(e) => (e.target.src = '/fallback.jpg')}
        />
      </div>

      <div className="property-content">
        <h2 className="property-title">{property.title}</h2>
        <p className="property-location">
          <i className="fas fa-map-marker-alt me-2"></i>
          {property.location}
        </p>
        <p className="property-price">
          ₹ {parseInt(property.price).toLocaleString('en-IN')}
        </p>
        <p className="property-description">{property.description}</p>

        <button
          className="book-now-button"
          onClick={handleBookNow}
          disabled={isBooking}
        >
          <i className="fas fa-calendar-check me-2"></i>
          {isBooking ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
