import prisma from "../config/prisma.js";

export const createLivraison = async (req, res) => {
  const { nom, prenom, date_livraison, telephone, expeditionId, utilisateurId } = req.body;

  if (!nom || !prenom || !date_livraison || !telephone || !expeditionId || !utilisateurId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await prisma.livraison.create({
      data: {
        nom,
        prenom,
        date_livraison: new Date(date_livraison),
        telephone,
        expedition: {
          connect: { id: expeditionId }, 
        },
        utilisateur: {
          connect: { id: utilisateurId }, 
        },
      },
    });
   
    res.status(201).json({ message: "Delivery created successfully" });
  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(500).json({ error: "An error occurred while creating the delivery" });
  }
};
export const getAllLivraisons = async (req, res) => {
  try {
    const livraisons = await prisma.livraison.findMany();
    res.status(200).json(livraisons);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ error: "An error occurred while fetching deliveries" });
  }
};

export const getLivraisonById = async (req, res) => {
  const { id } = req.params;
  try {
    const livraison = await prisma.livraison.findUnique({ where: { id: parseInt(id) } });
    if (!livraison) return res.status(404).json({ error: "Delivery not found" });
    res.status(200).json(livraison);
  } catch (error) {
    console.error("Error fetching delivery:", error);
    res.status(500).json({ error: "An error occurred while fetching the delivery" });
  }
};

export const updateLivraison = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, date_livraison, telephone, expeditionId, utilisateurId } = req.body;

  if (!nom || !prenom || !date_livraison || !telephone || !expeditionId || !utilisateurId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await prisma.livraison.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        prenom,
        date_livraison: new Date(date_livraison),
        telephone,
        expedition: {
          connect: { id: expeditionId }
        },
        utilisateur: {
          connect: { id: utilisateurId }
        }
      },
    });

    res.status(200).send("La livraison est mise à jour avec succès");
  } catch (error) {
    console.error("Error updating delivery:", error);
    res.status(500).send("Une erreur est survenue lors de la mise à jour de la livraison");
  }
};

export const deleteLivraison = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.livraison.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery:", error);
    res.status(500).json({ error: "An error occurred while deleting the delivery" });
  }
};
