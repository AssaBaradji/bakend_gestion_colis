-- AlterTable
ALTER TABLE "MethodePaiement" ADD COLUMN     "utilisateurId" INTEGER;

-- AlterTable
ALTER TABLE "TypeColis" ADD COLUMN     "utilisateurId" INTEGER;

-- AddForeignKey
ALTER TABLE "MethodePaiement" ADD CONSTRAINT "MethodePaiement_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeColis" ADD CONSTRAINT "TypeColis_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
