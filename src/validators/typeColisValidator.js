import { body, validationResult } from 'express-validator';
import prisma from "../config/prisma.js";

export const validateTypeColis = [
  body('nom')
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères.')
    .bail()
    .custom(async (value) => {
      const existingType = await prisma.typeColis.findUnique({ where: { nom: value } });
      if (existingType) {
        throw new Error("Ce nom de type de colis est déjà utilisé !");
      }
      return true;
    }),

  body('utilisateurId')
    .optional() 
    .isInt().withMessage("L'ID de l'utilisateur doit être un entier.")
    .bail()
    .custom(async (value) => {
      if (value) {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { id: value } });
        if (!utilisateur) {
          throw new Error("Utilisateur non trouvé !");
        }
      }
      return true;
    }),
];


export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
