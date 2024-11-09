import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const createColisValidator = [
  check("prix")
    .notEmpty()
    .withMessage("Le prix est requis!")
    .bail()
    .isDecimal({ decimal_digits: "2" })
    .withMessage(
      "Le prix doit être un nombre décimal avec 2 chiffres après la virgule!"
    ),

  check("code_colis")
    .notEmpty()
    .withMessage("Le code du colis est requis!")
    .bail()
    .isLength({ max: 20 })
    .withMessage("Le code du colis ne doit pas dépasser 20 caractères!")
    .bail()
    .custom(async (value) => {
      const existingColis = await prisma.colis.findUnique({
        where: { code_colis: value },
      });
      if (existingColis) {
        throw new Error("Ce code de colis est déjà utilisé!");
      }
      return true;
    }),

  check("date_enregistrement")
    .notEmpty()
    .withMessage("La date d'enregistrement est requise!")
    .bail()
    .isISO8601()
    .withMessage("La date d'enregistrement doit être au format ISO8601!"),

  check("description")
    .notEmpty()
    .withMessage("La description est requise!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("La description ne doit pas dépasser 255 caractères!"),

  check("emplacement_colis")
    .notEmpty()
    .withMessage("L'emplacement du colis est requis!")
    .bail()
    .isLength({ max: 100 })
    .withMessage("L'emplacement du colis ne doit pas dépasser 100 caractères!"),

  check("utilisateurId")
    .optional() 
    .isInt()
    .withMessage("L'ID de l'utilisateur doit être un entier!")
    .bail()
    .custom(async (value) => {
      if (value) {
        const user = await prisma.utilisateur.findUnique({
          where: { id: value },
        });
        if (!user) {
          throw new Error("Utilisateur non trouvé!");
        }
      }
      return true;
    }),

  check("typeId")
    .notEmpty()
    .withMessage("L'ID du type de colis est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID du type de colis doit être un entier!")
    .bail()
    .custom(async (value) => {
      const type = await prisma.typeColis.findUnique({ where: { id: value } });
      if (!type) {
        throw new Error("Type de colis non trouvé!");
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

const updateColisValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du colis est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID du colis doit être un entier!")
    .bail()
    .custom(async (value) => {
      const colis = await prisma.colis.findUnique({
        where: { id: parseInt(value) },
      });
      if (!colis) {
        throw new Error("Colis non trouvé!");
      }
      return true;
    }),

  check("prix")
    .optional()
    .isDecimal({ decimal_digits: "2" })
    .withMessage(
      "Le prix doit être un nombre décimal avec 2 chiffres après la virgule!"
    ),

  check("code_colis")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Le code du colis ne doit pas dépasser 20 caractères!")
    .bail()
    .custom(async (value, { req }) => {
      const existingColis = await prisma.colis.findUnique({
        where: { code_colis: value },
      });
      if (existingColis && existingColis.id !== parseInt(req.params.id)) {
        throw new Error("Ce code de colis est déjà utilisé!");
      }
      return true;
    }),

  check("date_enregistrement")
    .optional()
    .isISO8601()
    .withMessage("La date d'enregistrement doit être au format ISO8601!"),

  check("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La description ne doit pas dépasser 255 caractères!"),

  check("emplacement_colis")
    .optional()
    .isLength({ max: 100 })
    .withMessage("L'emplacement du colis ne doit pas dépasser 100 caractères!"),

  check("utilisateurId")
    .optional()
    .isInt()
    .withMessage("L'ID de l'utilisateur doit être un entier!")
    .bail()
    .custom(async (value) => {
      if (value) {
        const user = await prisma.utilisateur.findUnique({
          where: { id: value },
        });
        if (!user) {
          throw new Error("Utilisateur non trouvé!");
        }
      }
      return true;
    }),

  check("typeId")
    .optional()
    .isInt()
    .withMessage("L'ID du type de colis doit être un entier!")
    .bail()
    .custom(async (value) => {
      const type = await prisma.typeColis.findUnique({ where: { id: value } });
      if (!type) {
        throw new Error("Type de colis non trouvé!");
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

const deleteColisValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID du colis est requis!")
    .isInt()
    .withMessage("L'ID du colis doit être un entier!")
    .bail()
    .custom(async (value) => {
      const colis = await prisma.colis.findUnique({
        where: { id: parseInt(value) },
      });
      if (!colis) {
        throw new Error("Colis non trouvé!");
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

export { createColisValidator, updateColisValidator, deleteColisValidator };
