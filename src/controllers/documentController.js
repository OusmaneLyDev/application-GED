import prisma from '../config/prisma-client.js';

// Lire tous les documents
export const getDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        utilisateur: true,
        typeDocument: true,
        statutDocument: true,
      },
    });
    res.json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    res.status(500).json({ error: 'Erreur lors de la récupération des documents.', details: error.message });
  }
};

// Lire un document par ID
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: Number(id) },
      include: {
        utilisateur: true,
        typeDocument: true,
        statutDocument: true,
      },
    });
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: 'Document non trouvé.' });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du document:", error);
    res.status(500).json({ error: 'Erreur lors de la récupération du document.', details: error.message });
  }
};

// Créer un nouveau document
export const createDocument = async (req, res) => {
  try {
    const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = req.body;

    // Vérification des champs requis
    if (!titre || !id_Utilisateur || !id_TypeDocument || !id_StatutDocument) {
      return res.status(400).json({ error: 'Les champs "titre", "id_Utilisateur", "id_TypeDocument" et "id_StatutDocument" sont requis.' });
    }

    const newDocument = await prisma.document.create({
      data: {
        titre,
        description,
        date_depot: new Date(date_depot),
        utilisateur: { connect: { id: id_Utilisateur } },
        typeDocument: { connect: { id: id_TypeDocument } },
        statutDocument: { connect: { id: id_StatutDocument } },
      },
    });
    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Erreur lors de la création du document:", error);
    res.status(500).json({ error: 'Erreur lors de la création du document.', details: error.message });
  }
};

// Mettre à jour un document existant
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = req.body;

    // Vérification des champs requis
    if (!titre) {
      return res.status(400).json({ error: 'Le champ "titre" est requis.' });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: Number(id) },
      data: {
        titre,
        description,
        date_depot: new Date(date_depot),
        utilisateur: { connect: { id: id_Utilisateur } },
        typeDocument: { connect: { id: id_TypeDocument } },
        statutDocument: { connect: { id: id_StatutDocument } },
      },
    });
    res.json(updatedDocument);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document:", error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du document.', details: error.message });
  }
};

// Supprimer un document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le document existe avant de le supprimer
    const document = await prisma.document.findUnique({
      where: { id: Number(id) },
    });

    if (!document) {
      return res.status(404).json({ error: 'Document non trouvé.' });
    }

    await prisma.document.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Document supprimé avec succès.' });
  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error);
    res.status(500).json({ error: 'Erreur lors de la suppression du document.', details: error.message });
  }
};
