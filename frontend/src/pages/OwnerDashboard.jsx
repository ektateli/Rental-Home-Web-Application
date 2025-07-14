import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import './Dashboard.css';

const OwnerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const ownerId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${ownerId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error('Profile error:', err));

    axios.get(`http://localhost:5000/api/owner/${ownerId}/properties`)
      .then(res => setProperties(res.data))
      .catch(err => console.error('Properties error:', err));

    axios.get(`http://localhost:5000/api/owner/${ownerId}/bookings`)
      .then(res => setBookings(res.data))
      .catch(err => console.error('Bookings error:', err));
  }, [ownerId]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this property?")) {
      await axios.delete(`http://localhost:5000/api/owner/property/${id}`);
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="dashboard-container container mt-4">
      <UserProfile profile={profile} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Your Properties</h4>
        <button className="btn btn-primary" onClick={() => navigate('/add-property')}>
          + Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="table-responsive mb-5">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.image_url} alt={p.title} width="100" /></td>
                  <td>{p.title}</td>
                  <td>{p.location}</td>
                  <td>₹{p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/edit-property/${p.id}`)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h4>Tenant Bookings</h4>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Property</th>
              <th>Tenant</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{b.property_title}</td>
                <td>{b.tenant_name}</td>
                <td>{b.tenant_email}</td>
                <td>{new Date(b.booking_date).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>₹{b.amount || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerDashboard;
