-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_id_Utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "StatutDocument" DROP CONSTRAINT "StatutDocument_id_Utilisateur_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "id_Utilisateur" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StatutDocument" ALTER COLUMN "id_Utilisateur" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StatutDocument" ADD CONSTRAINT "StatutDocument_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
