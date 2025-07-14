const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all properties by owner
router.get('/owner/:ownerId/properties', (req, res) => {
  const ownerId = req.params.ownerId;
  const sql = 'SELECT * FROM properties WHERE owner_id = ?';
  db.query(sql, [ownerId], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(results);
  });
});

// Add property
router.post('/owner/property', (req, res) => {
  const { owner_id, title, description, location, price, image_url } = req.body;
  const sql = `INSERT INTO properties (owner_id, title, description, location, price, image_url)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [owner_id, title, description, location, price, image_url], (err, result) => {
    if (err) return res.status(500).json({ message: 'Insert error' });
    res.status(201).json({ message: 'Property added', id: result.insertId });
  });
});

// Delete property
router.delete('/owner/property/:id', (req, res) => {
  const propertyId = req.params.id;
  db.query('DELETE FROM properties WHERE id = ?', [propertyId], (err) => {
    if (err) return res.status(500).json({ message: 'Delete error' });
    res.json({ message: 'Property deleted' });
  });
});
module.exports = router;
