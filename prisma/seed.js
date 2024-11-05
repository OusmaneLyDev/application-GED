// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Création des utilisateurs
  const utilisateurs = [];
  for (let i = 0; i < 3; i++) {
    utilisateurs.push(await prisma.utilisateur.create({
      data: {
        nom: faker.person.fullName(),
        email: faker.internet.email(),
        mot_de_passe: faker.internet.password(),
        role: i === 0 ? 'admin' : 'user',
      },
    }));
  }

  // Création des types de documents
  const typesDocuments = [];
  for (let i = 0; i < 3; i++) {
    typesDocuments.push(await prisma.typeDocument.create({
      data: {
        nom: faker.commerce.productName(),
        description: faker.commerce.productDescription().substring(0, 50), // Limite de longueur
        id_Utilisateur: utilisateurs[i % utilisateurs.length].id,
      },
    }));
  }

  // Création des statuts de documents
  const statutsDocuments = [];
  const statutOptions = [
    { nom: 'en attente', description: 'Document en cours de traitement' },
    { nom: 'validé', description: 'Document validé par l\'administration' },
    { nom: 'rejeté', description: 'Document refusé suite à une révision' },
    { nom: 'archivé', description: 'Document archivé pour référence future' },
  ];
  for (let statut of statutOptions) {
    statutsDocuments.push(await prisma.statutDocument.create({
      data: {
        nom: statut.nom,
        description: statut.description,
        id_Utilisateur: utilisateurs[0].id, // Assigner au premier utilisateur
      },
    }));
  }

  // Création des documents
  for (let i = 0; i < 5; i++) {
    await prisma.document.create({
      data: {
        titre: faker.lorem.words(3).substring(0, 100), // Limite de longueur de 100 caractères
        description: faker.lorem.sentences(2).substring(0, 100), // Ajusté pour la limite
        date_depot: faker.date.past(),
        date_validation: i % 2 === 0 ? faker.date.recent() : null,
        historique: faker.lorem.words(3).substring(0, 20), // Limite de longueur de 20 caractères
        id_Utilisateur: utilisateurs[i % utilisateurs.length].id,
        id_TypeDocument: typesDocuments[i % typesDocuments.length].id,
        id_StatutDocument: statutsDocuments[i % statutsDocuments.length].id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Données de test générées avec succès !");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
