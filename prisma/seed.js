import prisma from "../src/config/prisma.js";
import bcrypt from "bcryptjs";
import { format } from "date-fns";

const formatDateTime = (date) => format(date, "yyyy-MM-dd HH:mm:ss");

async function main() {
  console.log("Démarrage du peuplement de la base de données...");

  console.log("Suppression des données existantes...");
  await prisma.livraison.deleteMany();
  await prisma.expedition.deleteMany();
  await prisma.paiement.deleteMany();
  await prisma.colis.deleteMany();
  await prisma.typeColis.deleteMany();
  await prisma.methodePaiement.deleteMany();
  await prisma.utilisateur.deleteMany();
  console.log("Données supprimées.");

  console.log("Ajout des utilisateurs...");
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.utilisateur.createMany({
    data: [
      {
        nom: "Admin",
        email: "admin@mauritanie.mr",
        mot_de_passe: adminPassword,
        role: "Admin",
        statut: true,
      },
      {
        nom: "Assa Baradji",
        email: "baradjiassa695@gmail.com",
        mot_de_passe: await bcrypt.hash("admin000", 10),
        role: "Admin",
        statut: true,
      },
      {
        nom: "Fatima Cissé",
        email: "fatima.cisse@mauritanie.mr",
        mot_de_passe: await bcrypt.hash("agent123", 10),
        role: "Agent",
        statut: true,
      },
      {
        nom: "Ahmed Ndiaye",
        email: "ahmed.ndiaye@mauritanie.mr",
        mot_de_passe: await bcrypt.hash("agent123", 10),
        role: "Agent",
        statut: false,
      },
      {
        nom: "Mariam Ba",
        email: "mariam.ba@mauritanie.mr",
        mot_de_passe: await bcrypt.hash("agent456", 10),
        role: "Agent",
        statut: true,
      },
      {
        nom: "Oumar Kane",
        email: "oumar.kane@mauritanie.mr",
        mot_de_passe: await bcrypt.hash("agent789", 10),
        role: "Agent",
        statut: false,
      },
      {
        nom: "Aïcha Sy",
        email: "aicha.sy@mauritanie.mr",
        mot_de_passe: await bcrypt.hash("admin456", 10),
        role: "Admin",
        statut: true,
      },
    ],
  });
  console.log("Utilisateurs ajoutés.");
  const utilisateur = await prisma.utilisateur.findFirst();

  console.log("Ajout des types de colis...");
  await prisma.typeColis.createMany({
    data: [
      { nom: "Documents", utilisateurId: utilisateur.id },
      { nom: "Électroménager", utilisateurId: utilisateur.id },
      { nom: "Vêtements", utilisateurId: utilisateur.id },
      { nom: "Meubles", utilisateurId: utilisateur.id },
      { nom: "Jouets", utilisateurId: utilisateur.id },
      { nom: "Livres", utilisateurId: utilisateur.id },
      { nom: "Produits de beauté", utilisateurId: utilisateur.id },
      { nom: "Articles de sport", utilisateurId: utilisateur.id },
      { nom: "Alimentation", utilisateurId: utilisateur.id },
    ],
  });
  console.log("Types de colis ajoutés.");
  const types = await prisma.typeColis.findMany();

  console.log("Ajout des méthodes de paiement...");
  await prisma.methodePaiement.createMany({
    data: [
      { nom: "Espèces", utilisateurId: utilisateur.id },
      { nom: "Bankily", utilisateurId: utilisateur.id },
      { nom: "Masrvi", utilisateurId: utilisateur.id },
      { nom: "Carte Bancaire", utilisateurId: utilisateur.id },
      { nom: "Amanaty", utilisateurId: utilisateur.id },
      { nom: "Click", utilisateurId: utilisateur.id },
      { nom: "Sedad", utilisateurId: utilisateur.id },
    ],
  });
  console.log("Méthodes de paiement ajoutées.");
  const methodesp = await prisma.methodePaiement.findMany();

  console.log("Ajout des colis...");
  const colis = await prisma.colis.createMany({
    data: [
      {
        prix: 5000.0,
        code_colis: "COLIS12345",
        date_enregistrement: new Date().toISOString(),
        description: "Documents ",
        emplacement_colis: "Nouakchott",
        utilisateurId: utilisateur.id,
        typeId: types[0].id,
      },
      {
        prix: 25000.0,
        code_colis: "COLIS67890",
        date_enregistrement: new Date().toISOString(),
        description: "Appareil électroménager",
        emplacement_colis: "Agence Rosso",
        utilisateurId: utilisateur.id,
        typeId: types[1].id,
      },
      {
        prix: 1500.0,
        code_colis: "COLIS11111",
        date_enregistrement: new Date().toISOString(),
        description: "Vêtements",
        emplacement_colis: "Agence Kaédi",
        utilisateurId: utilisateur.id,
        typeId: types[2].id,
      },
      {
        prix: 8000.0,
        code_colis: "COLIS22222",
        date_enregistrement: new Date().toISOString(),
        description: "Livres",
        emplacement_colis: "Agence Zouerate",
        utilisateurId: utilisateur.id,
        typeId: types[3].id,
      },
      {
        prix: 12000.0,
        code_colis: "COLIS33333",
        date_enregistrement: new Date().toISOString(),
        description: "Produits de beauté",
        emplacement_colis: "Agence Nouadhibou",
        utilisateurId: utilisateur.id,
        typeId: types[4].id,
      },
      {
        prix: 3000.0,
        code_colis: "COLIS44444",
        date_enregistrement: new Date().toISOString(),
        description: "Articles de sport",
        emplacement_colis: "Nouakchott",
        utilisateurId: utilisateur.id,
        typeId: types[5].id,
      },
    ],
  });
  console.log("Colis ajoutés.");
  const coliss = await prisma.colis.findMany();

  console.log("Ajout des paiements...");
  const paiements = [
    {
      montant: 5000.0,
      moment_paiement: "Départ",
      date_paiement: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[0].id,
      methodeId: methodesp[0].id,
    },
    {
      montant: 25000.0,
      moment_paiement: "Départ",
      date_paiement: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[1].id,
      methodeId: methodesp[1].id,
    },
    {
      montant: 1500.0,
      moment_paiement: "Arrivé",
      date_paiement: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[2].id,
      methodeId: methodesp[2].id,
    },
    {
      montant: 8000.0,
      moment_paiement: "Départ",
      date_paiement: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[3].id,
      methodeId: methodesp[3].id,
    },
    {
      montant: 12000.0,
      moment_paiement: "Départ",
      date_paiement: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[4].id,
      methodeId: methodesp[4].id,
    },
    {
      montant: 3000.0,
      moment_paiement: "Arrivé",
      date_paiement: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[5].id,
      methodeId: methodesp[5].id,
    },
  ];
  await prisma.paiement.createMany({ data: paiements });
  console.log("Paiements ajoutés.");

  console.log("Ajout des expéditions...");
  const expeditions = [
    {
      nom_destinataire: "Mohamed",
      prenom_destinataire: "Ould Sidi",
      telephone_destinataire: "44445644",
      destination: "Nouadhibou",
      date_expedition: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[0].id,
    },
    {
      nom_destinataire: "Mariem",
      prenom_destinataire: "Mint Ahmed",
      telephone_destinataire: "22224356",
      destination: "Kiffa",
      date_expedition: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[1].id,
    },
    {
      nom_destinataire: "Yacoub",
      prenom_destinataire: "Ould Abdallahi",
      telephone_destinataire: "33445566",
      destination: "Rosso",
      date_expedition: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[2].id,
    },
    {
      nom_destinataire: "Aïssata",
      prenom_destinataire: "Mint Ba",
      telephone_destinataire: "55566777",
      destination: "Kaédi",
      date_expedition: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[3].id,
    },
    {
      nom_destinataire: "Abdoulaye",
      prenom_destinataire: "Ould Ndiaye",
      telephone_destinataire: "66677888",
      destination: "Atar",
      date_expedition: new Date().toISOString(),
      utilisateurId: utilisateur.id,
      colisId: coliss[4].id,
    },
  ];
  await prisma.expedition.createMany({ data: expeditions });
  console.log("Expéditions ajoutées.");
  const expedition = await prisma.expedition.findMany();

  console.log("Ajout des livraisons...");
  const livraisons = [
    {
      nom: "Cheikh",
      prenom: "Ould Mohamed",
      date_livraison: new Date().toISOString(),
      telephone: "22299887766",
      expeditionId: expedition[0].id,
      utilisateurId: utilisateur.id,
    },
    {
      nom: "Aminata",
      prenom: "Mint Thiam",
      date_livraison: new Date().toISOString(),
      telephone: "22244556677",
      expeditionId: expedition[1].id,
      utilisateurId: utilisateur.id,
    },
    {
      nom: "Oumar",
      prenom: "Ould Sow",
      date_livraison: new Date().toISOString(),
      telephone: "333223344",
      expeditionId: expedition[2].id,
      utilisateurId: utilisateur.id,
    },
    {
      nom: "Khadija",
      prenom: "Mint Salem",
      date_livraison: new Date().toISOString(),
      telephone: "444556677",
      expeditionId: expedition[3].id,
      utilisateurId: utilisateur.id,
    },
    {
      nom: "Moustapha",
      prenom: "Ould Hamidou",
      date_livraison: new Date().toISOString(),
      telephone: "555667788",
      expeditionId: expedition[4].id,
      utilisateurId: utilisateur.id,
    },
  ];
  await prisma.livraison.createMany({ data: livraisons });
  console.log("Livraisons ajoutées.");

  console.log("Peuplement terminé avec succès.");
}

main()
  .catch((e) => {
    console.error("Erreur lors du peuplement de la base de données:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
