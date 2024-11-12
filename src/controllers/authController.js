// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import prisma from "../config/prisma.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { email, mot_de_passe } = req.body;

//   try {
//     const utilisateur = await prisma.utilisateur.findUnique({
//       where: { email }
//     });

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     const passwordValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
//     if (!passwordValide) {
//       return res.status(401).json({ message: "Mot de passe incorrect" });
//     }

//     const token = jwt.sign(
//       { utilisateurId: utilisateur.id, role: utilisateur.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "23h" }
//     );

//     return res.json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: "Erreur serveur", error });
//   }
// });

// export default router;

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

    // Vérification du statut de l'utilisateur
    if (utilisateur.statut === "bloqué") {
      return res.status(403).json({ message: "Votre compte est bloqué. Veuillez contacter l'administrateur." });
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

    return res.status(200).json({ token, message: "Connexion réussie !" });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;
