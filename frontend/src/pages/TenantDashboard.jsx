import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import './Dashboard.css';

const TenantDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const tenantId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/${tenantId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error('Profile error:', err));

    axios.get(`http://localhost:5000/api/tenant/${tenantId}/bookings`)
      .then(res => setBookings(res.data))
      .catch(err => console.error('Bookings error:', err));
  }, [tenantId]);

  return (
    <div className="dashboard-container container mt-4">
      <UserProfile profile={profile} />

      <h4>Your Bookings</h4>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map(b => (
          <div key={b.id} className="card mb-3 booking-card">
            <div className="card-body">
              <h5>{b.title}</h5>
              <p><strong>Location:</strong> {b.location}</p>
              <p><strong>Price:</strong> ₹{b.price}</p>
              <p><strong>Status:</strong> {b.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TenantDashboard;
