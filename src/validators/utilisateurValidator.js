import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const registerUserValidator = [
  check("nom")
    .notEmpty()
    .withMessage("Le nom est requis!")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères!"),

  check("email")
    .notEmpty()
    .withMessage("L'email est requis!")
    .bail()
    .isEmail()
    .withMessage("Email invalide!")
    .bail()
    .custom(async (value) => {
      const existingUser = await prisma.utilisateur.findUnique({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error("Cet email est déjà utilisé!");
      }
      return true;
    }),

  check("mot_de_passe")
    .notEmpty()
    .withMessage("Le mot de passe est requis!")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères!"),

  check("role").notEmpty().withMessage("Le rôle est requis!"),

  check("statut").isBoolean().withMessage("Le statut doit être un booléen!"),

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

const updateUserValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID doit être un entier!")
    .bail()
    .custom(async (value) => {
      const user = await prisma.utilisateur.findUnique({
        where: { id: parseInt(value) },
      });
      if (!user) {
        throw new Error("Utilisateur non trouvé!");
      }
      return true;
    }),

  check("nom")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères!"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Email invalide!")
    .bail()
    .custom(async (value, { req }) => {
      const existingUser = await prisma.utilisateur.findUnique({
        where: { email: value },
      });
      if (existingUser && existingUser.id !== parseInt(req.params.id)) {
        throw new Error("Cet email est déjà utilisé!");
      }
      return true;
    }),

  check("mot_de_passe")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères!"),

  check("role").optional().notEmpty().withMessage("Le rôle est requis!"),

  check("statut")
    .optional()
    .isBoolean()
    .withMessage("Le statut doit être un booléen!"),

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

const deleteUserValidator = [
  param("id")
    .notEmpty()
    .withMessage("L'ID est requis!")
    .bail()
    .isInt()
    .withMessage("L'ID doit être un entier!")
    .bail()
    .custom(async (value) => {
      const user = await prisma.utilisateur.findUnique({
        where: { id: parseInt(value) },
      });
      if (!user) {
        throw new Error("Utilisateur non trouvé!");
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

export { registerUserValidator, updateUserValidator, deleteUserValidator };
