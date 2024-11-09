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
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, createColisValidator, createColis);
router.get("/", authMiddleware, getAllColis); 
router.get("/:id",authMiddleware, getColisById); 
router.put("/:id", authMiddleware, updateColisValidator, updateColis); 
router.delete("/:id", authMiddleware, deleteColisValidator, deleteColis); 

export default router;
