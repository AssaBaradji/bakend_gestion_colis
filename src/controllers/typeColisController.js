import prisma from "../config/prisma.js";

export const createTypeColis = async (req, res) => {
  const { nom } = req.body;
  try {
    const typeColis = await prisma.typeColis.create({ data: { nom } });
    res.status(200).json("Type de colis ajouté avec succès");
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: "Parcel type name must be unique" });
    } else {
      console.error("Error creating parcel type:", error);
      res.status(500).json({ error: "An error occurred while creating the parcel type" });
    }
  }
};

export const getAllTypeColis = async (req, res) => {
  try {
    const typesColis = await prisma.typeColis.findMany();
    res.status(200).json(typesColis);
  } catch (error) {
    console.error("Error fetching parcel types:", error);
    res.status(500).json({ error: "An error occurred while fetching parcel types" });
  }
};

export const getTypeColisById = async (req, res) => {
  const { id } = req.params;
  try {
    const typeColis = await prisma.typeColis.findUnique({ where: { id: parseInt(id) } });
    if (!typeColis) return res.status(404).json({ error: "Parcel type not found" });
    res.status(200).json(typeColis);
  } catch (error) {
    console.error("Error fetching parcel type:", error);
    res.status(500).json({ error: "An error occurred while fetching the parcel type" });
  }
};

export const updateTypeColis = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const typeColis = await prisma.typeColis.update({ where: { id: parseInt(id) }, data: { nom } });
    res.status(200).json("Type de colis modifiée avec succès");
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: "Parcel type name must be unique" });
    } else {
      console.error("Error updating parcel type:", error);
      res.status(500).json({ error: "An error occurred while updating the parcel type" });
    }
  }
};

export const deleteTypeColis = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.typeColis.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Parcel type deleted successfully" });
  } catch (error) {
    console.error("Error deleting parcel type:", error);
    res.status(500).json({ error: "Impossible de supprimer ce type de colis" });
  }
};
