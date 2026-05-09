const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lyrics: { type: String, default: '' },
  status: { type: String, enum: ['Brouillon', 'En cours', 'Terminé'], default: 'Brouillon' },
  audioUrl: { type: String, default: '' },
  conceptImageUrl: { type: String, default: '' },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);