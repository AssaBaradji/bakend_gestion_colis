import express from "express";
import {
  createLivraison,
  getAllLivraisons,
  getLivraisonById,
  updateLivraison,
  deleteLivraison,
} from "../controllers/livraisonController.js";
import { validateLivraison, validateResult } from "../validators/livraisonValidator.js";

const router = express.Router();

// Ajout de la validation aux routes
router.post("/", validateLivraison, validateResult, createLivraison);           
router.get("/", getAllLivraisons);          
router.get("/:id", getLivraisonById);        
router.put("/:id", validateLivraison, validateResult, updateLivraison);         
router.delete("/:id", deleteLivraison);      

export default router;
