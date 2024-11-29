import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateCurrentUser,
  changePassword,
} from "../controllers/utilisateurController.js";
import {
  registerUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateCurrentUserValidator,
  changePasswordValidator,
} from "../validators/utilisateurValidator.js";

import { authMiddleware, adminMiddleware} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/register", authMiddleware, adminMiddleware, registerUserValidator, registerUser);
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.put("/profile", authMiddleware, updateCurrentUserValidator, updateCurrentUser)
router.put("/change-password", authMiddleware,  changePasswordValidator, changePassword)
router.put("/:id", authMiddleware, adminMiddleware, updateUserValidator, updateUser);
router.delete("/:id",authMiddleware, adminMiddleware, deleteUserValidator, deleteUser);

export default router;
