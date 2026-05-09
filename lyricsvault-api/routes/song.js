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

// ROUTE 3 : Récupérer UNE SEULE chanson via son ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Chanson introuvable dans le coffre" });
    }
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err });
  }
});

// ROUTE 4 : Modifier une chanson (PUT) - Parfait pour sauvegarder un brouillon
router.put('/:id', async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Met à jour uniquement les champs envoyés
      { new: true }       // Demande à MongoDB de nous renvoyer la version mise à jour
    );
    res.status(200).json(updatedSong);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err });
  }
});

// ROUTE 5 : Supprimer une chanson (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Chanson supprimée avec succès 🗑️" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err });
  }
});

module.exports = router;