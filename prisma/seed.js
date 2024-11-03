import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Création de plusieurs utilisateurs
    const utilisateurs = [];
    for (let i = 0; i < 10; i++) {
        const utilisateur = await prisma.utilisateur.create({
            data: {
                nom: faker.person.fullName(),
                email: faker.internet.email(),
                mot_de_passe: faker.internet.password(),
                role: faker.helpers.arrayElement(['admin', 'editor', 'viewer']),
                date_creation: faker.date.past(),
            },
        });
        utilisateurs.push(utilisateur);
    }

    // Création de types de documents
    const typesDocuments = [];
    for (let i = 0; i < 5; i++) {
        const typeDoc = await prisma.typeDocument.create({
            data: {
                nom: faker.lorem.word(),
                description: faker.lorem.sentence(),
                id_Utilisateur: faker.helpers.arrayElement(utilisateurs).id,
            },
        });
        typesDocuments.push(typeDoc);
    }

    // Création de statuts de documents
    const statutsDocuments = [];
    for (let i = 0; i < 3; i++) {
        const statutDoc = await prisma.statutDocument.create({
            data: {
                nom: faker.lorem.word(),
                description: faker.lorem.sentence(),
                id_Utilisateur: faker.helpers.arrayElement(utilisateurs).id,
            },
        });
        statutsDocuments.push(statutDoc);
    }

    // Création de documents
    for (let i = 0; i < 50; i++) {
        await prisma.document.create({
            data: {
                titre: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                date_depot: faker.date.recent(),
                date_validation: faker.date.future(),
                historique: faker.lorem.word(),
                id_Utilisateur: faker.helpers.arrayElement(utilisateurs).id,
                id_TypeDocument: faker.helpers.arrayElement(typesDocuments).id,
                id_StatutDocument: faker.helpers.arrayElement(statutsDocuments).id,
            },
        });
    }

    console.log('Données de test générées avec succès.');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
