const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Create a new booking
router.post('/bookings', (req, res) => {
  const { tenant_id, property_id, booking_date } = req.body;

  if (!tenant_id || !property_id || !booking_date) {
    return res.status(400).json({ message: 'Missing booking fields' });
  }

  // ✅ Check for duplicate booking
  const checkSql = `
    SELECT * FROM bookings
    WHERE tenant_id = ? AND property_id = ?
  `;

  db.query(checkSql, [tenant_id, property_id], (err, result) => {
    if (err) {
      console.error('Error checking existing bookings:', err);
      return res.status(500).json({ message: 'Booking check failed' });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: 'You have already booked this property.' });
    }

    // ✅ If no duplicate, insert booking
    const insertSql = `
      INSERT INTO bookings (tenant_id, property_id, booking_date)
      VALUES (?, ?, ?)
    `;

    db.query(insertSql, [tenant_id, property_id, booking_date], (err, result) => {
      if (err) {
        console.error('Booking insert error:', err);
        return res.status(500).json({ message: 'Booking failed' });
      }

      res.status(201).json({ message: 'Booking successful', bookingId: result.insertId });
    });
  });
});

// ✅ Get single booking by ID with property info
router.get('/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const sql = `
    SELECT b.*, p.title, p.location, p.price, p.image_url, p.description
    FROM bookings b
    JOIN properties p ON b.property_id = p.id
    WHERE b.id = ?
  `;

  db.query(sql, [bookingId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Booking not found' });

    res.json(results[0]);
  });
});

// ✅ Approve a booking
router.put('/bookings/:id/approve', (req, res) => {
  const sql = `UPDATE bookings SET status = 'approved' WHERE id = ?`;

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error('Approval error:', err);
      return res.status(500).json({ message: 'Approval failed' });
    }

    res.json({ message: 'Booking approved' });
  });
});

module.exports = router;
