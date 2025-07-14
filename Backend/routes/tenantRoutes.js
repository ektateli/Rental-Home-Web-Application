const express = require('express');
const router = express.Router();
const db = require('../config/db');

// View bookings
router.get('/tenant/:tenantId/bookings', (req, res) => {
  const tenantId = req.params.tenantId;
  const sql = `
    SELECT b.*, p.title, p.location, p.price
    FROM bookings b
    JOIN properties p ON b.property_id = p.id
    WHERE b.tenant_id = ?`;
  db.query(sql, [tenantId], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(results);
  });
});

// Book a property
router.post('/tenant/book', (req, res) => {
  const { tenant_id, property_id, booking_date } = req.body;
  const sql = `INSERT INTO bookings (tenant_id, property_id, booking_date)
               VALUES (?, ?, ?)`;
  db.query(sql, [tenant_id, property_id, booking_date], (err) => {
    if (err) return res.status(500).json({ message: 'Booking error' });
    res.status(201).json({ message: 'Booked successfully' });
  });
});

module.exports = router;
