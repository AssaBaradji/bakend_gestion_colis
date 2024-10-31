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

const router = express.Router();

router.post("/", createExpeditionValidator, createExpedition);        
router.get("/", getAllExpeditions);                                   
router.get("/:id", getExpeditionById);                                 
router.put("/:id", updateExpeditionValidator, updateExpedition);      
router.delete("/:id", deleteExpeditionValidator, deleteExpedition);    

export default router;
