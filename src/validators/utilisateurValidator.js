import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
const updateCurrentUserValidator = [
  check("name")
  .trim() 
  .isLength({ min: 2 })
  .withMessage("Le nom doit contenir au moins 2 caractères!")
  .bail()
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
  .withMessage("Le nom ne doit contenir que des lettres, des espaces, des apostrophes ou des traits d'union!")
  .bail()
  .notEmpty()
  .withMessage("Le nom ne doit pas contenir uniquement des espaces!")
  .bail(),

  check("email")
    .isEmail()
    .withMessage("Email invalide!")
    .bail()
    .custom(async (value, { req }) => {
      const token = req.header("Authorization")?.replace("Bearer ", "")
      if (!token) {
        return res.status(401).json({ error: "Authorization token is required." });
      }
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.utilisateurId;

      const existingUser = await prisma.utilisateur.findUnique({
        where: { email: value },
      });
      if (existingUser && existingUser.id !== parseInt(id)) {
        throw new Error("Cet email est déjà utilisé!");
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

const changePasswordValidator = [

  check("newPassword")
  .isLength({ min: 6 })
  .withMessage("Le mot de passe doit contenir au moins 6 caractères!")
  .bail(),

  check("currentPassword")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères!")
    .bail()
    .custom(async (value, {req}) => {
      
      const token = req.header("Authorization")?.replace("Bearer ", "")
      if (!token) {
        return res.status(401).json({ error: "Authorization token is required." });
      }
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.utilisateurId;


      const existingUser = await prisma.utilisateur.findUnique({
        where: { id: id },
      });
      

    const compare = await bcrypt.compare(
        value,
        existingUser.mot_de_passe
      )
      

      if (!compare) {
        throw new Error("Mot de passe actuelle est incorrecte. ");
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

export { registerUserValidator, updateUserValidator, deleteUserValidator, updateCurrentUserValidator, changePasswordValidator};
