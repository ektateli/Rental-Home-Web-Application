import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/property/${property.id}`); // Redirect to property details
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="property-card card h-100 w-100 shadow-sm d-flex flex-column">
      <img
        src={property.image_url}
        className="property-image"
        alt="Property"
        onError={(e) => (e.target.src = '/fallback.jpg')}
      />
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">{property.location}</p>
        <p className="card-text fw-bold">
          ₹{parseInt(property.price).toLocaleString('en-IN')}
        </p>
        <button className="btn btn-primary w-100 mt-2" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
