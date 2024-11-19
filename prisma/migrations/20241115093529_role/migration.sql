/*
  Warnings:

  - The `role` column on the `Utilisateur` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Agent');

-- AlterTable
ALTER TABLE "Utilisateur" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Agent';
