import express from "express";
import {
  createMethodePaiement,
  getAllMethodePaiements,
  getMethodePaiementById,
  updateMethodePaiement,
  deleteMethodePaiement,
} from "../controllers/methodePaiementController.js";
import {
  validateMethodePaiement,
  validateResult,
} from "../validators/methodePaiementValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/", authMiddleware,
  validateMethodePaiement,
  validateResult,
  createMethodePaiement
);
router.get("/", authMiddleware, getAllMethodePaiements);
router.get("/:id", authMiddleware,  getMethodePaiementById);
router.put(
  "/:id",authMiddleware,
  validateMethodePaiement,
  validateResult,
  updateMethodePaiement
);
router.delete("/:id", authMiddleware, deleteMethodePaiement);

export default router;
