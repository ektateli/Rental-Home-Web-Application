// Backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // change if your MySQL username is different
//   password: 'admin', // change if your MySQL password is not empty
//   database: 'home_rentals' // change if your DB name is different
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('✅ MySQL connected');
});

module.exports = db;
