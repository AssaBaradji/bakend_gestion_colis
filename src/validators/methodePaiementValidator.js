import { body, validationResult } from 'express-validator';
import prisma from "../config/prisma.js";

export const validateMethodePaiement = [
  body('nom')
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères.')
    .bail()
    .custom(async (value) => {
      const existingMethode = await prisma.methodePaiement.findUnique({ where: { nom: value } });
      if (existingMethode) {
        throw new Error("Le nom de la méthode de paiement doit être unique !");
      }
      return true;
    }),

  body('utilisateurId')
    .optional() 
    .isInt().withMessage("L'ID de l'utilisateur doit être un entier.")
    .bail()
    .custom(async (value) => {
      if (value) {
        const user = await prisma.utilisateur.findUnique({ where: { id: value } });
        if (!user) {
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
