const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../config/db');

// SIGNUP route
// router.post('/signup', (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ message: 'Please fill all fields' });
//   }

//   const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
//   db.query(sql, [name, email, password, role], (err, result) => {
//     if (err) {
//       console.error('Signup error:', err);
//       return res.status(500).json({ message: 'Server error or email already exists' });
//     }
//     res.status(201).json({ message: 'User registered successfully' });
//   });
// });



router.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.error('Signup error:', err);
      // Check if it's a duplicate entry error
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already registered' });
      }
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// LOGIN route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    res.json({ user });
  });
});

module.exports = router;
