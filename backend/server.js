require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// AFTER (New, Guaranteed working)
const User = require('./models/UserModel');       // <--- Matches new filename
const Vendor = require('./models/VendorModel');   // <--- Matches new filename

const app = express();
app.use(express.json());
app.use(cors());

// CRITICAL: Serve the 'uploads' folder as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MULTER CONFIGURATION (Safe Filenames) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // FIX: Replace spaces with underscores to prevent broken URLs
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '-' + safeName);
  }
});
const upload = multer({ storage: storage });

// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });
    
    const user = new User({ name, email, password, role });
    await user.save();
    res.json({ message: "Signup Success" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password || user.role !== role) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    res.json({ user });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- USER ROUTES (With Fixed URL Generation) ---
app.put('/api/users/:id', upload.single('profilePic'), async (req, res) => {
  try {
    let updateData = req.body;
    
    if (req.file) {
      // FIX: Force forward slashes for URLs, even on Windows
      const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      updateData.profilePic = fullUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedUser);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- VENDOR ROUTES ---
app.post('/api/vendors', upload.single('image'), async (req, res) => {
  try {
    const { name, type, price, location, description, ownerId } = req.body;
    
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newVendor = new Vendor({
      name, type, price, location, description, ownerId,
      images: [imageUrl], 
      rating: 0
    });

    await newVendor.save();
    res.json(newVendor);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/vendors', async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

app.get('/api/vendors/my-services/:ownerId', async (req, res) => {
  try {
    const myServices = await Vendor.find({ ownerId: req.params.ownerId });
    res.json(myServices);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/vendors/:id', async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  res.json(vendor);
});

const PORT = 5000;
const PORT = process.env.PORT || 5000; // <--- CHANGED
app.listen(PORT, () => console.log(`Server running on ${PORT}`));