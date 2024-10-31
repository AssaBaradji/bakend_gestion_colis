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

const router = express.Router();

router.post("/", createPaiementValidator, createPaiement);
router.get("/", getAllPaiements);
router.get("/:id", getPaiementById);
router.put("/:id", updatePaiementValidator, updatePaiement);
router.delete("/:id", deletePaiementValidator, deletePaiement);

export default router;
