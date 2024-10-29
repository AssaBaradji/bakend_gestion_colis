import express from "express";
import {
  createLivraison,
  getAllLivraisons,
  getLivraisonById,
  updateLivraison,
  deleteLivraison,
} from "../controllers/livraisonController.js";

const router = express.Router();

router.post("/", createLivraison);           
router.get("/", getAllLivraisons);          
router.get("/:id", getLivraisonById);        
router.put("/:id", updateLivraison);         
router.delete("/:id", deleteLivraison);      

export default router;
