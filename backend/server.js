// ============================================
// EVENTRA - Event Planner Backend Server
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// --- IMPORTS ---
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// --- INITIALIZE APP ---
const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// Serve the 'uploads' folder as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/bookings', bookingRoutes);

// --- DATABASE CONNECTION & SERVER START ---
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
