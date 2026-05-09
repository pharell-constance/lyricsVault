const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// INSCRIPTION
exports.register = async (req, res) => {
  try {
    const { email, password, pseudo } = req.body;

    // On vérifie si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Cet email est déjà utilisé." });

    // On hache le mot de passe (ne JAMAIS stocker en clair !)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      pseudo
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès ! 🌙" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CONNEXION
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur introuvable." });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect." });

    // Créer le jeton JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      token,
      user: { id: user._id, pseudo: user.pseudo }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};