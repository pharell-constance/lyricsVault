const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🖤 Connecté avec succès à MongoDB (LyricsVault) !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

  // Importation de nos routes
const songRoutes = require('./routes/song');
app.use('/api/songs', songRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue dans le coffre-fort LyricsVault API 🌙');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🎙️ Serveur en écoute sur le port ${PORT}`);
});