import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token invalide.' });
  }
};


// const adminMiddleware = (req, res, next) => {
//   if (req.utilisateur.role !== 'ADMIN') {
//     return res.status(403).json({ message: 'Accès interdit. Administrateurs uniquement.' });
//   }
//   next();
// };



export { authMiddleware};
