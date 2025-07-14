const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes.js');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ownerBookingRoutes = require('./routes/ownerBookings');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));


app.use('/api', propertyRoutes); // <--- This allows /api/properties
app.use('/api', authRoutes);
app.use('/api', ownerRoutes);
app.use('/api', tenantRoutes);
app.use('/api', bookingRoutes);
app.use('/api', paymentRoutes); 
app.use('/api', userRoutes);    
app.use('/api',ownerBookingRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
