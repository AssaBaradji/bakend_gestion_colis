import express from "express";
import {
  createTypeColis,
  getAllTypeColis,
  getTypeColisById,
  updateTypeColis,
  deleteTypeColis,
} from "../controllers/typeColisController.js";
import {
  validateTypeColis,
  validateResult,
} from "../validators/typeColisValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, validateTypeColis, validateResult, createTypeColis);
router.get("/", authMiddleware, getAllTypeColis);
router.get("/:id", authMiddleware, getTypeColisById);
router.put("/:id", authMiddleware, validateTypeColis, validateResult, updateTypeColis);
router.delete("/:id", authMiddleware, deleteTypeColis);

export default router;
