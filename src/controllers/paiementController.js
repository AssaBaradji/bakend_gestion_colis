import prisma from "../config/prisma.js";

export const createPaiement = async (req, res) => {
  const { montant, date_paiement, colisId, methodeId, moment_paiement } =
    req.body;
  const utilisateurId = req.utilisateur.utilisateurId;

  try {
    await prisma.paiement.create({
      data: {
        montant,
        date_paiement: new Date(date_paiement),
        colisId,
        methodeId,
        utilisateurId,
        moment_paiement,
      },
    });

    res.status(201).json("Paiement ajouté avec succès");
  } catch (error) {
    console.error("Error creating payment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment" });
  }
};

export const getAllPaiements = async (req, res) => {
  try {
    const paiements = await prisma.paiement.findMany();
    res.status(200).json(paiements);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching payments" });
  }
};

export const getPaiementById = async (req, res) => {
  const { id } = req.params;
  try {
    const paiement = await prisma.paiement.findUnique({
      where: { id: parseInt(id) },
    });
    if (!paiement) return res.status(404).json({ error: "Payment not found" });
    res.status(200).json(paiement);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the payment" });
  }
};

export const updatePaiement = async (req, res) => {
  const { id } = req.params;
  const { montant, date_paiement, colisId, methodeId, moment_paiement } =
    req.body;
  const utilisateurId = req.utilisateur.utilisateurId;

  try {
    await prisma.paiement.update({
      where: { id: parseInt(id) },
      data: {
        montant,
        date_paiement: new Date(date_paiement),
        colisId,
        methodeId,
        utilisateurId,
        moment_paiement,
      },
    });

    res.status(200).json("Paiement modifié avec succès");
  } catch (error) {
    console.error("Error updating payment:", error);
    res
      .status(500)
      .json({
        error: "Une erreur est survenue lors de la modification du paiement",
      });
  }
};

export const deletePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.paiement.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the payment" });
  }
};
