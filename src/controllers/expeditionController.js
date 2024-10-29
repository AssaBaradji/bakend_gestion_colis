import prisma from "../config/prisma.js";

export const createExpedition = async (req, res) => {
  const {
    nom_destinataire,
    prenom_destinataire,
    telephone_destinataire,
    destination,
    date_expedition,
    utilisateurId,
    colisId
  } = req.body;

  try {
   
    const existingExpedition = await prisma.expedition.findUnique({
      where: { colisId },
    });

    if (existingExpedition) {
      return res.status(400).json({ error: "An expedition already exists for this colisId" });
    }

 
    await prisma.expedition.create({
      data: {
        nom_destinataire,
        prenom_destinataire,
        telephone_destinataire,
        destination,
        date_expedition: new Date(date_expedition),
        utilisateurId,
        colisId,
      },
    });

 
    res.status(201).json({ message: "Expedition created successfully" });
  } catch (error) {
    console.error("Error creating expedition:", error);
    res.status(500).json({ error: "An error occurred while creating the expedition" });
  }
};

export const getAllExpeditions = async (req, res) => {
  try {
    const expeditions = await prisma.expedition.findMany();
    res.status(200).json(expeditions);
  } catch (error) {
    console.error("Error fetching expeditions:", error);
    res.status(500).json({ error: "An error occurred while fetching expeditions" });
  }
};

export const getExpeditionById = async (req, res) => {
  const { id } = req.params;
  try {
    const expedition = await prisma.expedition.findUnique({ where: { id: parseInt(id) } });
    if (!expedition) return res.status(404).json({ error: "Expedition not found" });
    res.status(200).json(expedition);
  } catch (error) {
    console.error("Error fetching expedition:", error);
    res.status(500).json({ error: "An error occurred while fetching the expedition" });
  }
};

export const updateExpedition = async (req, res) => {
  const { id } = req.params;
  const {
    nom_destinataire,
    prenom_destinataire,
    telephone_destinataire,
    destination,
    date_expedition,
    code_suivi,
    colisId,
    utilisateurId,
  } = req.body; 

  try {
    await prisma.expedition.update({
      where: { id: parseInt(id) },
      data: {
        nom_destinataire,
        prenom_destinataire,
        telephone_destinataire,
        destination,
        date_expedition: new Date(date_expedition),
        code_suivi,
        colisId,
        utilisateurId,
      },
    });

   
    res.status(200).json({ message: "Expedition updated successfully" });
  } catch (error) {
    console.error("Error updating expedition:", error);
    res.status(500).json({ error: "An error occurred while updating the expedition" });
  }
};

export const deleteExpedition = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expedition.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Expedition deleted successfully" });
  } catch (error) {
    console.error("Error deleting expedition:", error);
    res.status(500).json({ error: "An error occurred while deleting the expedition" });
  }
};
