// export const login = async (req, res) => {
//   const { email, mot_de_passe } = req.body;

//   if (!email || !mot_de_passe) {
//     console.log("Email ou mot de passe manquant");
//     return res.status(400).json({ error: "Email et mot de passe sont requis." });
//   }

//   try {
//     const user = await prisma.utilisateur.findUnique({ where: { email } });
//     if (!user) {
//       console.log("Utilisateur non trouvé pour cet email");
//       return res.status(404).send('Utilisateur non trouvé');
//     }

//     const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
//     if (!isPasswordValid) {
//       console.log("Mot de passe incorrect");
//       return res.status(401).send('Mot de passe incorrect');
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });

//     res.status(200).json({ token, message: 'Connexion réussie !' });
//   } catch (error) {
//     console.error("Erreur lors de la connexion:", error);
//     res.status(500).send("Erreur lors de la connexion de l'utilisateur");
//   }
// };
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email }
    });

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const passwordValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!passwordValide) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { utilisateurId: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "23h" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;

