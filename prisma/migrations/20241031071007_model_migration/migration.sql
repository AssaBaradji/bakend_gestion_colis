-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "mot_de_passe" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "statut" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MethodePaiement" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,

    CONSTRAINT "MethodePaiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeColis" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,

    CONSTRAINT "TypeColis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colis" (
    "id" SERIAL NOT NULL,
    "prix" DECIMAL(10,2) NOT NULL,
    "code_colis" VARCHAR(20) NOT NULL,
    "date_enregistrement" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "emplacement_colis" VARCHAR(100) NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Colis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "montant" DECIMAL(10,2) NOT NULL,
    "moment_paiement" VARCHAR(50) NOT NULL,
    "date_paiement" TIMESTAMP(3) NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "colisId" INTEGER NOT NULL,
    "methodeId" INTEGER NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expedition" (
    "id" SERIAL NOT NULL,
    "nom_destinataire" VARCHAR(50) NOT NULL,
    "prenom_destinataire" VARCHAR(50) NOT NULL,
    "telephone_destinataire" VARCHAR(20) NOT NULL,
    "destination" VARCHAR(100) NOT NULL,
    "date_expedition" TIMESTAMP(3) NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "colisId" INTEGER NOT NULL,

    CONSTRAINT "Expedition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livraison" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "prenom" VARCHAR(50) NOT NULL,
    "date_livraison" TIMESTAMP(3) NOT NULL,
    "telephone" VARCHAR(20) NOT NULL,
    "expeditionId" INTEGER NOT NULL,
    "utilisateurId" INTEGER NOT NULL,

    CONSTRAINT "Livraison_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MethodePaiement_nom_key" ON "MethodePaiement"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "TypeColis_nom_key" ON "TypeColis"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Colis_code_colis_key" ON "Colis"("code_colis");

-- CreateIndex
CREATE UNIQUE INDEX "Expedition_colisId_key" ON "Expedition"("colisId");

-- CreateIndex
CREATE UNIQUE INDEX "Livraison_expeditionId_key" ON "Livraison"("expeditionId");

-- AddForeignKey
ALTER TABLE "Colis" ADD CONSTRAINT "Colis_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colis" ADD CONSTRAINT "Colis_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeColis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_colisId_fkey" FOREIGN KEY ("colisId") REFERENCES "Colis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_methodeId_fkey" FOREIGN KEY ("methodeId") REFERENCES "MethodePaiement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expedition" ADD CONSTRAINT "Expedition_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expedition" ADD CONSTRAINT "Expedition_colisId_fkey" FOREIGN KEY ("colisId") REFERENCES "Colis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livraison" ADD CONSTRAINT "Livraison_expeditionId_fkey" FOREIGN KEY ("expeditionId") REFERENCES "Expedition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livraison" ADD CONSTRAINT "Livraison_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
