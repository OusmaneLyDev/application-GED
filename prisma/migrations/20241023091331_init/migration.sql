-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "mot_de_passe" VARCHAR(50) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeDocument" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "id_Utilisateur" INTEGER NOT NULL,

    CONSTRAINT "TypeDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatutDocument" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(20) NOT NULL,
    "description" TEXT,
    "id_Utilisateur" INTEGER NOT NULL,

    CONSTRAINT "StatutDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "titre" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "date_depot" TIMESTAMP(3) NOT NULL,
    "date_validation" TIMESTAMP(3),
    "historique" VARCHAR(20),
    "id_Utilisateur" INTEGER NOT NULL,
    "id_TypeDocument" INTEGER NOT NULL,
    "id_StatutDocument" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "TypeDocument" ADD CONSTRAINT "TypeDocument_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatutDocument" ADD CONSTRAINT "StatutDocument_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_id_Utilisateur_fkey" FOREIGN KEY ("id_Utilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_id_TypeDocument_fkey" FOREIGN KEY ("id_TypeDocument") REFERENCES "TypeDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_id_StatutDocument_fkey" FOREIGN KEY ("id_StatutDocument") REFERENCES "StatutDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
