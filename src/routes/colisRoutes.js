import express from "express";
import {
  createColis,
  getAllColis,
  getColisById,
  updateColis,
  deleteColis,
} from "../controllers/colisController.js";

const router = express.Router();

router.post("/", createColis);                       
router.get("/", getAllColis);                        
router.get("/:id", getColisById);                    
router.put("/:id", updateColis);                   
router.delete("/:id", deleteColis);                 

export default router;
