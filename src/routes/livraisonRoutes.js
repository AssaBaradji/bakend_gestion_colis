import express from "express";
import {
  createLivraison,
  getAllLivraisons,
  getLivraisonById,
  updateLivraison,
  deleteLivraison,
} from "../controllers/livraisonController.js";
import { validateLivraison, validateResult } from "../validators/livraisonValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ajout de la validation aux routes
router.post("/", authMiddleware, validateLivraison, validateResult, createLivraison);           
router.get("/", authMiddleware, getAllLivraisons);          
router.get("/:id", authMiddleware, getLivraisonById);        
router.put("/:id", authMiddleware, validateLivraison, validateResult, updateLivraison);         
router.delete("/:id", authMiddleware, deleteLivraison);      

export default router;
