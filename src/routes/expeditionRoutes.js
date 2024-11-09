import express from "express";
import {
  createExpedition,
  getAllExpeditions,
  getExpeditionById,
  updateExpedition,
  deleteExpedition,
} from "../controllers/expeditionController.js";
import {
  createExpeditionValidator,
  updateExpeditionValidator,
  deleteExpeditionValidator,
} from "../validators/expeditionValidator.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createExpeditionValidator, createExpedition);        
router.get("/", authMiddleware, getAllExpeditions);                                   
router.get("/:id", authMiddleware, getExpeditionById);                                 
router.put("/:id", authMiddleware, updateExpeditionValidator, updateExpedition);      
router.delete("/:id", authMiddleware, deleteExpeditionValidator, deleteExpedition);    

export default router;
