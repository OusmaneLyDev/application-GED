-- DropForeignKey
ALTER TABLE "TypeDocument" DROP CONSTRAINT "TypeDocument_id_Utilisateur_fkey";

-- AlterTable
ALTER TABLE "TypeDocument" ALTER COLUMN "id_Utilisateur" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TypeDocument" ADD CONSTRAINT "TypeDocument_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
