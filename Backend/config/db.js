// Backend/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // change if your MySQL username is different
  password: 'admin', // change if your MySQL password is not empty
  database: 'home_rentals' // change if your DB name is different
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('✅ MySQL connected');
});

module.exports = db;
