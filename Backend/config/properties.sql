-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS home_rentals;

-- Use the database
USE home_rentals;

-- User table (owners or tenants)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('tenant', 'owner') DEFAULT 'tenant',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the properties table
CREATE TABLE IF NOT EXISTS properties (
 id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT,
  title VARCHAR(150),
  description TEXT,
  location VARCHAR(100),
  price VARCHAR(50),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT,
  property_id INT,
  booking_date DATE,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  FOREIGN KEY (tenant_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Payments (optional)
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  amount DECIMAL(10,2),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Insert sample property data
-- Sample users
INSERT INTO users (name, email, password, role) VALUES
('Ekta', 'ekta@example.com', 'hashedpassword1', 'owner'),
('Ravi', 'ravi@example.com', 'hashedpassword2', 'tenant');

-- Sample property
-- Reinsert using valid owner_id
-- INSERT INTO properties (owner_id, title, description, location, price, image_url) VALUES
-- (1, '2BHK Flat in Pune', 'Spacious 2BHK with parking', 'Pune', '₹28,000', 'http://localhost:3000/house1.jpg');

-- INSERT INTO properties (owner_id, title, description, location, price, image_url) VALUES
-- (1, '2BHK Flat in Nerul', 'Sea view flat with 2 balconies', 'Nerul', '₹30,000', 'http://localhost:3000/house2.jpg');

-- INSERT INTO properties (owner_id, title, description, location, price, image_url) VALUES
-- (1, '1BHK in Mumbai', 'Furnished apartment near metro', 'Mumbai', '₹22,000', 'http://localhost:3000/house3.jpg');

-- Sample booking
-- INSERT INTO bookings (tenant_id, property_id, booking_date) VALUES
-- (2, 1, '2025-07-15');
