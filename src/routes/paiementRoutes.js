import express from "express";
import {
  createPaiement,
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
} from "../controllers/paiementController.js";

const router = express.Router();

router.post("/", createPaiement);            
router.get("/", getAllPaiements);           
router.get("/:id", getPaiementById);        
router.put("/:id", updatePaiement);        
router.delete("/:id", deletePaiement);       

export default router;
