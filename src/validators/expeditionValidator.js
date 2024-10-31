import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";

const createExpeditionValidator = [
  check("nom_destinataire")
    .notEmpty()
    .withMessage("Le nom du destinataire est requis!")
    .isLength({ max: 50 })
    .withMessage("Le nom du destinataire ne doit pas dépasser 50 caractères!"),

  check("prenom_destinataire")
    .notEmpty()
    .withMessage("Le prénom du destinataire est requis!")
    .isLength({ max: 50 })
    .withMessage("Le prénom du destinataire ne doit pas dépasser 50 caractères!"),

  check("telephone_destinataire")
    .notEmpty()
    .withMessage("Le téléphone du destinataire est requis!")
    .isLength({ max: 20 })
    .withMessage("Le téléphone du destinataire ne doit pas dépasser 20 caractères!"),

  check("destination")
    .notEmpty()
    .withMessage("La destination est requise!")
    .isLength({ max: 100 })
    .withMessage("La destination ne doit pas dépasser 100 caractères!"),

  check("date_expedition")
    .notEmpty()
    .withMessage("La date d'expédition est requise!")
    .isISO8601()
    .withMessage("La date d'expédition doit être au format ISO8601!"),

  check("utilisateurId")
    .notEmpty()
    .withMessage("L'ID de l'utilisateur est requis!")
    .isInt()
    .withMessage("L'ID de l'utilisateur doit être un entier!")
    .custom(async (value) => {
      const user = await prisma.utilisateur.findUnique({ where: { id: value } });
      if (!user) {
        throw new Error("Utilisateur non trouvé!");
      }
      return true;
    }),

  check("colisId")
    .notEmpty()
    .withMessage("L'ID du colis est requis!")
    .isInt()
    .withMessage("L'ID du colis doit être un entier!")
    .custom(async (value) => {
      const colis = await prisma.colis.findUnique({ where: { id: value } });
      if (!colis) {
        throw new Error("Colis non trouvé!");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const updateExpeditionValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID de l'expédition est requis!")
    .isInt()
    .withMessage("L'ID de l'expédition doit être un entier!")
    .custom(async (value) => {
      const expedition = await prisma.expedition.findUnique({ where: { id: parseInt(value) } });
      if (!expedition) {
        throw new Error("Expédition non trouvée!");
      }
      return true;
    }),

  check("nom_destinataire")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Le nom du destinataire ne doit pas dépasser 50 caractères!"),

  check("prenom_destinataire")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Le prénom du destinataire ne doit pas dépasser 50 caractères!"),

  check("telephone_destinataire")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Le téléphone du destinataire ne doit pas dépasser 20 caractères!"),

  check("destination")
    .optional()
    .isLength({ max: 100 })
    .withMessage("La destination ne doit pas dépasser 100 caractères!"),

  check("date_expedition")
    .optional()
    .isISO8601()
    .withMessage("La date d'expédition doit être au format ISO8601!"),

  check("utilisateurId")
    .optional()
    .isInt()
    .withMessage("L'ID de l'utilisateur doit être un entier!")
    .custom(async (value) => {
      const user = await prisma.utilisateur.findUnique({ where: { id: value } });
      if (!user) {
        throw new Error("Utilisateur non trouvé!");
      }
      return true;
    }),

  check("colisId")
    .optional()
    .isInt()
    .withMessage("L'ID du colis doit être un entier!")
    .custom(async (value) => {
      const colis = await prisma.colis.findUnique({ where: { id: value } });
      if (!colis) {
        throw new Error("Colis non trouvé!");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const deleteExpeditionValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID de l'expédition est requis!")
    .isInt()
    .withMessage("L'ID de l'expédition doit être un entier!")
    .custom(async (value) => {
      const expedition = await prisma.expedition.findUnique({ where: { id: parseInt(value) } });
      if (!expedition) {
        throw new Error("Expédition non trouvée!");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

export {
  createExpeditionValidator,
  updateExpeditionValidator,
  deleteExpeditionValidator,
};
