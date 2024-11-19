import { sendEmail } from "../config/emailService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { email } });

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const resetToken = jwt.sign({ id: utilisateur.id }, JWT_SECRET, {
      expiresIn: "1h", 
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Réinitialisation de mot de passe",
      `Bonjour, cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`
    );

    res.status(200).json({ message: "Email de réinitialisation envoyé." });
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      await prisma.utilisateur.update({
        where: { id: decoded.id },
        data: { mot_de_passe: hashedPassword },
      });
  
      res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
  