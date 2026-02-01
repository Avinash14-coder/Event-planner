const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  // NEW: Link this service to the User Account who created it
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  images: [{ type: String }],
  contact: { phone: { type: String }, email: { type: String } }
});

module.exports = mongoose.model('Vendor', VendorSchema);