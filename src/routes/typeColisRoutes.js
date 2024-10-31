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

const router = express.Router();

router.post("/", validateTypeColis, validateResult, createTypeColis);
router.get("/", getAllTypeColis);
router.get("/:id", getTypeColisById);
router.put("/:id", validateTypeColis, validateResult, updateTypeColis);
router.delete("/:id", deleteTypeColis);

export default router;
