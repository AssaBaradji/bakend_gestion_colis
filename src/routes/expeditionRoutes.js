
import express from "express";
import {
  createExpedition,
  getAllExpeditions,
  getExpeditionById,
  updateExpedition,
  deleteExpedition,
} from "../controllers/expeditionController.js";

const router = express.Router();

router.post("/", createExpedition);         
router.get("/", getAllExpeditions);          
router.get("/:id", getExpeditionById);       
router.put("/:id", updateExpedition);        
router.delete("/:id", deleteExpedition);    
export default router;
