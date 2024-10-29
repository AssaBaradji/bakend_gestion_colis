import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const registerUser = async (req, res) => {
  const { nom, email, mot_de_passe, role, statut } = req.body;

  try {
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

    await prisma.utilisateur.create({
      data: {
        nom,
        email,
        mot_de_passe: hashedPassword,
        role,
        statut,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany();
    const usersWithStatusText = users.map(({ mot_de_passe, ...user }) => ({
      ...user,
      statut: user.statut ? "Actif" : "Bloqué",
    }));

    res.status(200).json(usersWithStatusText);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const userId = parseInt(id, 10); 
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const user = await prisma.utilisateur.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        statut: user.statut ? "Actif" : "Bloqué",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "An error occurred while fetching the user" });
    }
  };

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, email, mot_de_passe, role, statut } = req.body;

  try {
    const existingUser = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = mot_de_passe
      ? await bcrypt.hash(mot_de_passe, 10)
      : existingUser.mot_de_passe;

    await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: { nom, email, mot_de_passe: hashedPassword, role, statut },
    });

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.utilisateur.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};
