const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const auth = require('../middleware/authMiddleware'); // Import du garde du corps

// ROUTE 1 : Créer une nouvelle chanson (Sécurisée)
router.post('/', auth, async (req, res) => {
  try {
    const newSong = new Song({
      title: req.body.title,
      lyrics: req.body.lyrics,
      status: req.body.status || 'Brouillon',
      album: req.body.albumId, // Optionnel
      conceptImageUrl: req.body.conceptImageUrl,
      audioUrl: req.body.audioUrl,
      user: req.user.id, // L'ID vient maintenant du Token JWT et non plus d'un faux ID
    });

    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err.message });
  }
});

// ROUTE 2 : Récupérer UNIQUEMENT tes chansons (Sécurisée)
router.get('/', auth, async (req, res) => {
  try {
    // On cherche uniquement les chansons où l'user est égal à l'ID du token
    const songs = await Song.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
});

// ROUTE 3 : Récupérer UNE chanson précise (Sécurisée)
router.get('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.params.id, user: req.user.id });
    if (!song) {
      return res.status(404).json({ message: "Chanson introuvable ou accès refusé" });
    }
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
});

// ROUTE 4 : Modifier une chanson (Sécurisée)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedSong = await Song.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // On vérifie que c'est bien TA chanson
      { $set: req.body },
      { new: true }
    );
    
    if (!updatedSong) {
      return res.status(404).json({ message: "Modification impossible (chanson introuvable)" });
    }
    
    res.status(200).json(updatedSong);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
  }
});

// ROUTE 5 : Supprimer une chanson (Sécurisée)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedSong = await Song.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!deletedSong) {
      return res.status(404).json({ message: "Suppression impossible (chanson introuvable)" });
    }
    
    res.status(200).json({ message: "Chanson supprimée avec succès du coffre 🗑️" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
});

module.exports = router;