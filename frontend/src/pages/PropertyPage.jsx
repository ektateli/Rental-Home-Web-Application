import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PropertyPage.css';

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  // Filter properties based on location
  const filteredProperties = properties.filter(property =>
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="property-page container mt-4">
      <h2 className="mb-4">All Available Properties</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProperties.length === 0 ? (
        <p>No properties found for this location.</p>
      ) : (
        <div className="property-grid">
          {filteredProperties.map(property => (
            <div key={property.id} className="property-card">
              <img src={property.image_url} alt={property.title} />
              <div className="property-details">
                <h5>{property.title}</h5>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> {property.price}</p>
                <p>{property.description}</p>
                <Link to={`/property/${property.id}`} className="btn btn-primary mt-2">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
