import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const JWT_SECRET = process.env.JWT_SECRET;

export const createTypeColis = async (req, res) => {
  const { nom } = req.body;
  const utilisateurId = req.utilisateur.utilisateurId;

  try {
    const typeColis = await prisma.typeColis.create({
      data: {
        nom,
        utilisateurId: utilisateurId,
      },
    });
    res.status(200).json("Type de colis ajouté avec succès");
  } catch (error) {
    if (error.code === "P2002") {
      res
        .status(409)
        .json({ error: "Le nom du type de colis doit être unique" });
    } else {
      console.error("Error creating parcel type:", error);
      res
        .status(500)
        .json({
          error: "Une erreur est survenue lors de la création du type de colis",
        });
    }
  }
};

export const getAllTypeColis = async (req, res) => {
  try {
    const typesColis = await prisma.typeColis.findMany();
    res.status(200).json(typesColis);
  } catch (error) {
    console.error("Error fetching parcel types:", error);
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la récupération des types de colis",
      });
  }
};

export const getTypeColisById = async (req, res) => {
  const { id } = req.params;
  try {
    const typeColis = await prisma.typeColis.findUnique({
      where: { id: parseInt(id) },
    });
    if (!typeColis)
      return res.status(404).json({ error: "Type de colis non trouvé" });
    res.status(200).json(typeColis);
  } catch (error) {
    console.error("Error fetching parcel type:", error);
    res
      .status(500)
      .json({
        error:
          "Une erreur est survenue lors de la récupération du type de colis",
      });
  }
};

export const updateTypeColis = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;

  try {
    const typeColis = await prisma.typeColis.update({
      where: { id: parseInt(id) },
      data: { nom },
    });
    res.status(200).json("Type de colis modifié avec succès");
  } catch (error) {
    if (error.code === "P2002") {
      res
        .status(409)
        .json({ error: "Le nom du type de colis doit être unique" });
    } else {
      console.error("Error updating parcel type:", error);
      res
        .status(500)
        .json({
          error:
            "Une erreur est survenue lors de la mise à jour du type de colis",
        });
    }
  }
};

export const deleteTypeColis = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.typeColis.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Type de colis supprimé avec succès" });
  } catch (error) {
    console.error("Error deleting parcel type:", error);
    res.status(500).json({ error: "Impossible de supprimer ce type de colis" });
  }
};
