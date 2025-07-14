// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // Record payment
// router.post('/payments', (req, res) => {
//   const { booking_id, amount } = req.body;
//   const sql = `INSERT INTO payments (booking_id, amount) VALUES (?, ?)`;
//   db.query(sql, [booking_id, amount], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Payment error' });
//     res.status(201).json({ message: 'Payment successful' });
//   });
// });

// module.exports = router;


// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL connection (callback style)

router.post('/payments', (req, res) => {
  const { booking_id, amount } = req.body;

  // 1. Insert payment
  const insertPayment = `INSERT INTO payments (booking_id, amount) VALUES (?, ?)`;
  db.query(insertPayment, [booking_id, amount], (err) => {
    if (err) return res.status(500).json({ message: 'Payment insert error' });

    // 2. Update booking status
    const updateBooking = `UPDATE bookings SET status = ? WHERE id = ?`;
    db.query(updateBooking, ['approved', booking_id], (err) => {
      if (err) return res.status(500).json({ message: 'Booking update error' });

      // 3. Get booking details
      db.query('SELECT * FROM bookings WHERE id = ?', [booking_id], (err, bookingResult) => {
        if (err || bookingResult.length === 0) return res.status(500).json({ message: 'Booking fetch error' });

        const booking = bookingResult[0];

        // 4. Get tenant
        db.query('SELECT * FROM users WHERE id = ?', [booking.tenant_id], (err, tenantResult) => {
          if (err || tenantResult.length === 0) return res.status(500).json({ message: 'Tenant fetch error' });

          const tenant = tenantResult[0];

          // 5. Get property
          db.query('SELECT * FROM properties WHERE id = ?', [booking.property_id], (err, propertyResult) => {
            if (err || propertyResult.length === 0) return res.status(500).json({ message: 'Property fetch error' });

            const property = propertyResult[0];

            // 6. Get owner (not used here but fetched for record)
            db.query('SELECT * FROM users WHERE id = ?', [property.owner_id], (err, ownerResult) => {
              if (err || ownerResult.length === 0) return res.status(500).json({ message: 'Owner fetch error' });

              // ✅ Success response (no email now)
              return res.status(200).json({
                message: 'Payment successful',
                booking: booking,
                tenant: tenant,
                property: property,
                owner: ownerResult[0] // optional
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;

