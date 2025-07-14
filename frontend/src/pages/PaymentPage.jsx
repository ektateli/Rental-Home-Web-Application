import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [property, setProperty] = useState(null);
  const [showGateway, setShowGateway] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/${bookingId}`)
      .then(res => {
        setBooking(res.data);
        return axios.get(`http://localhost:5000/api/properties/${res.data.property_id}`);
      })
      .then(res => setProperty(res.data))
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to load details');
      });
  }, [bookingId]);

  const startDummyGateway = () => {
    setShowGateway(true); // open the fake gateway UI
  };

  const confirmDummyPayment = async () => {
    setIsProcessing(true);

    try {
      const amount = property.price.replace(/[^\d]/g, '');
      await axios.post('http://localhost:5000/api/payments', {
        booking_id: bookingId,
        amount: amount
      });

      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/approve`);

      alert('Payment successful!');
      navigate('/tenant-dashboard');
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!booking || !property) return <p>Loading...</p>;

  return (
    <div className="payment-page container mt-5">
      <h2 className="mb-4">Confirm Your Booking</h2>

      <div className="card mb-4 shadow-sm p-3">
        <div className="row">
          <div className="col-md-4">
            <img src={property.image_url} alt={property.title} className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h4>{property.title}</h4>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Description:</strong> {property.description}</p>
            <p><strong>Booking Date:</strong> {booking.booking_date}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Total Amount:</strong> ₹{property.price}</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={startDummyGateway}>
            Pay Now
          </button>
        </div>
      </div>

      {/* Dummy Payment Gateway */}
      {showGateway && (
        <div className="dummy-gateway-overlay">
          <div className="dummy-gateway-modal p-4 shadow">
            <h4>Fake Payment Gateway</h4>
            <p>Enter mock payment details:</p>

            <input className="form-control mb-2" placeholder="Card Number (1234 5678 9012 3456)" />
            <input className="form-control mb-2" placeholder="Expiry (MM/YY)" />
            <input className="form-control mb-3" placeholder="CVV" />

            <button
              className="btn btn-primary w-100"
              onClick={confirmDummyPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${property.price}`}
            </button>

            <button
              className="btn btn-link text-danger mt-2"
              onClick={() => setShowGateway(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
