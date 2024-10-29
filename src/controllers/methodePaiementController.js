import prisma from "../config/prisma.js";

export const createMethodePaiement = async (req, res) => {
  const { nom } = req.body;
  try {
    const methode = await prisma.methodePaiement.create({ data: { nom } });
    res.status(201).json(methode);
  } catch (error) {
    console.error("Error creating payment method:", error);
    res.status(500).json({ error: "An error occurred while creating the payment method" });
  }
};

export const getAllMethodePaiements = async (req, res) => {
  try {
    const methodes = await prisma.methodePaiement.findMany();
    res.status(200).json(methodes);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ error: "An error occurred while fetching payment methods" });
  }
};

export const getMethodePaiementById = async (req, res) => {
  const { id } = req.params;
  try {
    const methode = await prisma.methodePaiement.findUnique({ where: { id: parseInt(id) } });
    if (!methode) return res.status(404).json({ error: "Payment method not found" });
    res.status(200).json(methode);
  } catch (error) {
    console.error("Error fetching payment method:", error);
    res.status(500).json({ error: "An error occurred while fetching the payment method" });
  }
};

export const updateMethodePaiement = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  try {
    const methode = await prisma.methodePaiement.update({ where: { id: parseInt(id) }, data: { nom } });
    res.status(200).json(methode);
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({ error: "An error occurred while updating the payment method" });
  }
};

export const deleteMethodePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.methodePaiement.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Payment method deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment method:", error);
    res.status(500).json({ error: "An error occurred while deleting the payment method" });
  }
};
