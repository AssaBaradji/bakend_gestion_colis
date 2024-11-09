import { body, validationResult } from "express-validator";
import prisma from "../config/prisma.js";

export const validateLivraison = [
  body("nom")
    .notEmpty()
    .withMessage("Nom est requis.")
    .isLength({ max: 50 })
    .withMessage("Nom ne doit pas dépasser 50 caractères."),

  body("prenom")
    .notEmpty()
    .withMessage("Prénom est requis.")
    .isLength({ max: 50 })
    .withMessage("Prénom ne doit pas dépasser 50 caractères."),

  body("date_livraison")
    .notEmpty()
    .withMessage("Date de livraison est requise.")
    .isISO8601()
    .withMessage("Date de livraison doit être une date valide."),

  body("telephone")
    .notEmpty()
    .withMessage("Téléphone est requis.")
    .isLength({ max: 20 })
    .withMessage("Téléphone ne doit pas dépasser 20 caractères."),

  body("expeditionId")
    .notEmpty()
    .withMessage("ID d'expédition est requis.")
    .isInt()
    .withMessage("ID d'expédition doit être un entier.")
    .custom(async (value) => {
      const expedition = await prisma.expedition.findUnique({
        where: { id: value },
      });
      if (!expedition) {
        throw new Error("Expédition non trouvée !");
      }
      return true;
    }),

  body("utilisateurId")
    .optional()
    .isInt()
    .withMessage("ID d'utilisateur doit être un entier.")
    .custom(async (value) => {
      if (value) {
        const user = await prisma.utilisateur.findUnique({
          where: { id: value },
        });
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
