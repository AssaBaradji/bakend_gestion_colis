import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/utilisateurController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
