const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Récupérer le token dans l'en-tête "Authorization"
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: "Accès refusé. Aucun jeton fourni." });
  }

  // Le format standard est "Bearer TOKEN", on récupère juste le TOKEN
  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // On ajoute les infos de l'utilisateur à la requête
    next(); // On laisse passer la requête vers la route
  } catch (err) {
    res.status(400).json({ message: "Jeton invalide." });
  }
};