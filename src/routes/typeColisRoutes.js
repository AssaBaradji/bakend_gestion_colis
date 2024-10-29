import express from "express";
import {
  createTypeColis,
  getAllTypeColis,
  getTypeColisById,
  updateTypeColis,
  deleteTypeColis,
} from "../controllers/typeColisController.js";

const router = express.Router();

router.post("/", createTypeColis);                  
router.get("/", getAllTypeColis);                   
router.get("/:id", getTypeColisById);               
router.put("/:id", updateTypeColis);              
router.delete("/:id", deleteTypeColis);            

export default router;
