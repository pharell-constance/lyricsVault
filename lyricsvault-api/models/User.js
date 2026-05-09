const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  pseudo: { type: String, default: 'Chanteur Mystère' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);