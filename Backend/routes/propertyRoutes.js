// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // GET all properties
// router.get('/properties', (req, res) => {
//   const sql = 'SELECT * FROM properties';
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error fetching properties:', err);
//       return res.status(500).json({ success: false, message: 'Database error' });
//     }
//     res.json(results);
//   });
// });

// // POST a new property
// router.post('/properties', (req, res) => {
//   const { owner_id, title, description, location, price, image_url } = req.body;

//   if (!owner_id || !title || !location || !price || !image_url) {
//     return res.status(400).json({ message: 'Please fill all required fields' });
//   }

//   const sql = `INSERT INTO properties (owner_id, title, description, location, price, image_url) 
//                VALUES (?, ?, ?, ?, ?, ?)`;

//   db.query(sql, [owner_id, title, description, location, price, image_url], (err, result) => {
//     if (err) {
//       console.error('Error inserting property:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }
//     res.status(201).json({ message: 'Property added successfully', id: result.insertId });
//   });
// });

// // GET a single property by ID
// router.get('/properties/:id', (req, res) => {
//   const propertyId = req.params.id;
//   const sql = 'SELECT * FROM properties WHERE id = ?';

//   db.query(sql, [propertyId], (err, results) => {
//     if (err) {
//       console.error('Error fetching property:', err);
//       return res.status(500).json({ success: false, message: 'Database error' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ success: false, message: 'Property not found' });
//     }

//     res.json(results[0]); // ✅ Return the single property
//   });
// });



// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// === Setup multer ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// === GET all properties ===
router.get('/properties', (req, res) => {
  const sql = 'SELECT * FROM properties';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching properties:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

// === POST a new property with image upload ===
router.post('/properties', upload.single('image'), (req, res) => {
  const { owner_id, title, description, location, price } = req.body;
  const file = req.file;

  if (!owner_id || !title || !location || !price || !file) {
    return res.status(400).json({ message: 'Please fill all required fields including image' });
  }

  const image_url = `http://localhost:5000/uploads/${file.filename}`;

  const sql = `INSERT INTO properties (owner_id, title, description, location, price, image_url) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [owner_id, title, description, location, price, image_url], (err, result) => {
    if (err) {
      console.error('Error inserting property:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Property added successfully', id: result.insertId });
  });
});

// === GET a single property by ID ===
router.get('/properties/:id', (req, res) => {
  const propertyId = req.params.id;
  const sql = 'SELECT * FROM properties WHERE id = ?';

  db.query(sql, [propertyId], (err, results) => {
    if (err) {
      console.error('Error fetching property:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json(results[0]);
  });
});


router.put("/properties/:id", upload.single("image"), (req, res) => {
  const propertyId = req.params.id;
  const { title, description, location, price } = req.body;
  let image_url = req.body.image_url;

  if (req.file) {
    image_url = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  const sql = `
    UPDATE properties SET
      title = ?,
      description = ?,
      location = ?,
      price = ?,
      image_url = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, location, price, image_url, propertyId], (err) => {
    if (err) {
      console.error("Error updating:", err);
      return res.status(500).json({ message: "Database update error" });
    }
    res.json({ message: "Property updated successfully" });
  });
});
module.exports = router;
