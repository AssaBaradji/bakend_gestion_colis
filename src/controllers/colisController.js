import prisma from "../config/prisma.js";

export const createColis = async (req, res) => {
  const { prix, code_colis, date_enregistrement, description, emplacement_colis, utilisateurId, typeId } = req.body;
  try {
    const colis = await prisma.colis.create({
      data: { prix, code_colis, date_enregistrement: new Date(date_enregistrement), description, emplacement_colis, utilisateurId, typeId },
    });
    res.status(201).json(colis);
  } catch (error) {
    console.error("Error creating parcel:", error);
    res.status(500).json({ error: "An error occurred while creating the parcel" });
  }
};

export const getAllColis = async (req, res) => {
  try {
    const colis = await prisma.colis.findMany();
    res.status(200).json(colis);
  } catch (error) {
    console.error("Error fetching parcels:", error);
    res.status(500).json({ error: "An error occurred while fetching parcels" });
  }
};

export const getColisById = async (req, res) => {
  const { id } = req.params;
  try {
    const colis = await prisma.colis.findUnique({ where: { id: parseInt(id) } });
    if (!colis) return res.status(404).json({ error: "Parcel not found" });
    res.status(200).json(colis);
  } catch (error) {
    console.error("Error fetching parcel:", error);
    res.status(500).json({ error: "An error occurred while fetching the parcel" });
  }
};

export const updateColis = async (req, res) => {
  const { id } = req.params;
  const { prix, code_colis, date_enregistrement, description, emplacement_colis, utilisateurId, typeId } = req.body;
  try {
    const colis = await prisma.colis.update({
      where: { id: parseInt(id) },
      data: { prix, code_colis, date_enregistrement: new Date(date_enregistrement), description, emplacement_colis, utilisateurId, typeId },
    });
    res.status(200).json(colis);
  } catch (error) {
    console.error("Error updating parcel:", error);
    res.status(500).json({ error: "An error occurred while updating the parcel" });
  }
};

export const deleteColis = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.colis.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (error) {
    console.error("Error deleting parcel:", error);
    res.status(500).json({ error: "An error occurred while deleting the parcel" });
  }
};
