import express from "express";
import {
  createColis,
  getAllColis,
  getColisById,
  updateColis,
  deleteColis,
} from "../controllers/colisController.js";
import {
  createColisValidator,
  updateColisValidator,
  deleteColisValidator,
} from "../validators/colisValidator.js"; 

const router = express.Router();


router.post("/", createColisValidator, createColis);
router.get("/", getAllColis); 
router.get("/:id", getColisById); 
router.put("/:id", updateColisValidator, updateColis); 
router.delete("/:id", deleteColisValidator, deleteColis); 

export default router;
