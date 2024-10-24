import prisma from '../config/prisma-client.js';

const getDocuments = async (req, res) => {
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
    res.status(500).json({ error: 'Erreur lors de la récupération des documents.' });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) },
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
    res.status(500).json({ error: 'Erreur lors de la récupération du document.' });
  }
};

const createDocument = async (req, res) => {
  try {
    const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = req.body;
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
    res.json(newDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du document.' });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = req.body;
    const updatedDocument = await prisma.document.update({
      where: { id: parseInt(id) },
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
    res.status(500).json({ error: 'Erreur lors de la mise à jour du document.' });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Document supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du document.' });
  }
};
export default {
    getDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
  };