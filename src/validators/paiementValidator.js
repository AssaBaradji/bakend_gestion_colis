import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const createPaiementValidator = [
  check("montant")
    .notEmpty()
    .withMessage("Le montant est requis!")
    .bail()
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le montant doit être un nombre décimal avec 2 chiffres après la virgule!"),

  check("date_paiement")
    .notEmpty()
    .withMessage("La date de paiement est requise!")
    .bail()
    .isISO8601()
    .withMessage("La date de paiement doit être au format ISO8601!"),

  check("colisId")
    .notEmpty()
    .withMessage("L'ID du colis est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID du colis doit être un entier!")
    .bail()
    .custom(async (value) => {
      const colis = await prisma.colis.findUnique({ where: { id: value } });
      if (!colis) {
        throw new Error("Colis non trouvé!");
      }
      return true;
    }),

  check("methodeId")
    .notEmpty()
    .withMessage("L'ID de la méthode de paiement est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID de la méthode de paiement doit être un entier!")
    .bail()
    .custom(async (value) => {
      const methode = await prisma.methodePaiement.findUnique({ where: { id: value } });
      if (!methode) {
        throw new Error("Méthode de paiement non trouvée!");
      }
      return true;
    }),

  check("utilisateurId")
    .notEmpty()
    .withMessage("L'ID de l'utilisateur est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID de l'utilisateur doit être un entier!")
    .bail()
    .custom(async (value) => {
      const utilisateur = await prisma.utilisateur.findUnique({ where: { id: value } });
      if (!utilisateur) {
        throw new Error("Utilisateur non trouvé!");
      }
      return true;
    }),

  check("moment_paiement")
    .notEmpty()
    .withMessage("Le moment de paiement est requis!")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Le moment de paiement ne doit pas dépasser 50 caractères!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const updatePaiementValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du paiement est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID du paiement doit être un entier!")
    .bail()
    .custom(async (value) => {
      const paiement = await prisma.paiement.findUnique({ where: { id: parseInt(value) } });
      if (!paiement) {
        throw new Error("Paiement non trouvé!");
      }
      return true;
    }),

  check("montant")
    .optional()
    .isDecimal({ decimal_digits: '2' })
    .withMessage("Le montant doit être un nombre décimal avec 2 chiffres après la virgule!"),

  check("date_paiement")
    .optional()
    .isISO8601()
    .withMessage("La date de paiement doit être au format ISO8601!"),

  check("colisId")
    .optional()
    .isInt()
    .withMessage("L'ID du colis doit être un entier!")
    .bail()
    .custom(async (value) => {
      const colis = await prisma.colis.findUnique({ where: { id: value } });
      if (!colis) {
        throw new Error("Colis non trouvé!");
      }
      return true;
    }),

  check("methodeId")
    .optional()
    .isInt()
    .withMessage("L'ID de la méthode de paiement doit être un entier!")
    .bail()
    .custom(async (value) => {
      const methode = await prisma.methodePaiement.findUnique({ where: { id: value } });
      if (!methode) {
        throw new Error("Méthode de paiement non trouvée!");
      }
      return true;
    }),

  check("utilisateurId")
    .optional()
    .isInt()
    .withMessage("L'ID de l'utilisateur doit être un entier!")
    .bail()
    .custom(async (value) => {
      const utilisateur = await prisma.utilisateur.findUnique({ where: { id: value } });
      if (!utilisateur) {
        throw new Error("Utilisateur non trouvé!");
      }
      return true;
    }),

  check("moment_paiement")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Le moment de paiement ne doit pas dépasser 50 caractères!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const deletePaiementValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du paiement est requis!")
    .isInt()
    .withMessage("L'ID du paiement doit être un entier!")
    .bail()
    .custom(async (value) => {
      const paiement = await prisma.paiement.findUnique({ where: { id: parseInt(value) } });
      if (!paiement) {
        throw new Error("Paiement non trouvé!");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export { createPaiementValidator, updatePaiementValidator, deletePaiementValidator };
