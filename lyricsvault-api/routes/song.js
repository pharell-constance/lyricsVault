const express = require('express');
const router = express.Router();
const Song = require('../models/Song'); // On importe le modèle qu'on a créé

// ROUTE 1 : Créer une nouvelle chanson (POST)
router.post('/', async (req, res) => {
  try {
    // Pour l'instant on triche en mettant un "user" et un "album" fictifs 
    // vu qu'on n'a pas encore le système de connexion finalisé.
    const newSong = new Song({
      title: req.body.title,
      lyrics: req.body.lyrics,
      status: req.body.status || 'Brouillon',
      user: '64f1b2c3e4d5a6b7c8d9e0f1', // Faux ID temporaire
    });

    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err });
  }
});

// ROUTE 2 : Récupérer toutes tes chansons (GET)
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err });
  }
});

module.exports = router;