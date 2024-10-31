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

const router = express.Router();

router.post(
  "/",
  validateMethodePaiement,
  validateResult,
  createMethodePaiement
);
router.get("/", getAllMethodePaiements);
router.get("/:id", getMethodePaiementById);
router.put(
  "/:id",
  validateMethodePaiement,
  validateResult,
  updateMethodePaiement
);
router.delete("/:id", deleteMethodePaiement);

export default router;
