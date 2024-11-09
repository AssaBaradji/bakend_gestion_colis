import express from "express";
import {
  createPaiement,
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
} from "../controllers/paiementController.js";
import {
  createPaiementValidator,
  updatePaiementValidator,
  deletePaiementValidator,
} from "../validators/paiementValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPaiementValidator, createPaiement);
router.get("/", authMiddleware, getAllPaiements);
router.get("/:id", authMiddleware, getPaiementById);
router.put("/:id", authMiddleware, updatePaiementValidator, updatePaiement);
router.delete("/:id", authMiddleware, deletePaiementValidator, deletePaiement);

export default router;
