import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/utilisateurController.js";
import {
  registerUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from "../validators/utilisateurValidator.js";

import { authMiddleware, adminMiddleware} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/register", authMiddleware, adminMiddleware, registerUserValidator, registerUser);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware,getUserById);
router.put("/:id", authMiddleware, adminMiddleware, updateUserValidator, updateUser);
router.delete("/:id", deleteUserValidator, deleteUser);

export default router;
