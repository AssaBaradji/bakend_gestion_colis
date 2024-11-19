import express from "express";
import cors from "cors";
import helmet from "helmet";
import utilisateurRoutes from "./src/routes/utilisateurRoutes.js";
import paiementRoutes from "./src/routes/paiementRoutes.js";
import expeditionRoutes from "./src/routes/expeditionRoutes.js";
import livraisonRoutes from "./src/routes/livraisonRoutes.js";
import methodePaiementRoutes from "./src/routes/methodePaiementRoutes.js";
import typeColisRoutes from "./src/routes/typeColisRoutes.js";
import colisRoutes from "./src/routes/colisRoutes.js";
// import authRoutes from "./src/routes/authRoutes.js"
import loginRoute from "./src/controllers/authController.js"
import motDePassRoute from "./src/routes/motDePassRoutes.js"

const app = express();
const port = 3000;

const corsOptions = {
  origin: (origin, callback) => {
    if (["http://localhost:5173"].includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

app.use("/utilisateurs", utilisateurRoutes);
app.use("/paiements", paiementRoutes);
app.use("/expeditions",  expeditionRoutes);
app.use("/livraisons", livraisonRoutes);
app.use("/methodes-paiement", methodePaiementRoutes);
app.use("/types-colis", typeColisRoutes);
app.use("/colis", colisRoutes);
app.use("/login", loginRoute);
app.use("/api", motDePassRoute);





// app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
