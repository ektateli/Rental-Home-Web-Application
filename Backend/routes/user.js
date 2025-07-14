const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get user profile by ID
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT id, name, email, role FROM users WHERE id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('User profile fetch error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  });
});

module.exports = router;
