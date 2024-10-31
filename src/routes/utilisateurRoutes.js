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

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserValidator, updateUser);
router.delete("/:id", deleteUserValidator, deleteUser);

export default router;
