const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get bookings for an owner
router.get('/api/owner/:ownerId/bookings', (req, res) => {
  const ownerId = req.params.ownerId;

  const sql = `
     SELECT 
      b.id AS booking_id,
      b.booking_date,
      b.status,
      p.title AS property_title,
      u.name AS tenant_name,
      u.email AS tenant_email,
      MAX(pay.amount) AS amount
    FROM bookings b
    JOIN properties p ON b.property_id = p.id
    JOIN users u ON b.tenant_id = u.id
    LEFT JOIN payments pay ON pay.booking_id = b.id
    WHERE p.owner_id = ?
    GROUP BY b.id
    ORDER BY b.booking_date DESC
  `;

  db.query(sql, [ownerId], (err, result) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Failed to load bookings' });
    }

    res.json(result);
  });
});

module.exports = router;
