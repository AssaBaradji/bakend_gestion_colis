import express from "express";
import {
  createMethodePaiement,
  getAllMethodePaiements,
  getMethodePaiementById,
  updateMethodePaiement,
  deleteMethodePaiement,
} from "../controllers/methodePaiementController.js";

const router = express.Router();

router.post("/", createMethodePaiement);           
router.get("/", getAllMethodePaiements);            
router.get("/:id", getMethodePaiementById);         
router.put("/:id", updateMethodePaiement);          
router.delete("/:id", deleteMethodePaiement);       

export default router;
