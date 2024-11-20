import prisma from '../config/prisma-client.js';
import i18n from '../config/i18next.js';

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
    console.error(i18n.t("fetchDocumentsError"), error);
    res.status(500).json({ error: i18n.t("fetchDocumentsError"), details: error.message });
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
      res.status(404).json({ error: i18n.t("documentNotFound") });
    }
  } catch (error) {
    console.error(i18n.t("fetchDocumentError"), error);
    res.status(500).json({ error: i18n.t("fetchDocumentError"), details: error.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const { titre, description, date_depot, id_TypeDocument, id_StatutDocument, id_Utilisateur } = req.body;

    // Validation des types
    if (!titre || typeof titre !== 'string') {
      return res.status(400).json({ error: 'Le champ titre est obligatoire et doit être une chaîne.' });
    }
    if (!id_TypeDocument || isNaN(Number(id_TypeDocument))) {
      return res.status(400).json({ error: 'Le champ id_TypeDocument est obligatoire et doit être un nombre.' });
    }
    if (!id_StatutDocument || isNaN(Number(id_StatutDocument))) {
      return res.status(400).json({ error: 'Le champ id_StatutDocument est obligatoire et doit être un nombre.' });
    }

    const fichier = req.file?.filename || null;

    // Création du document
    const newDocument = await prisma.document.create({
      data: {
        titre,
        description,
        date_depot: new Date(date_depot), 
        fichier,
        typeDocument: { connect: { id: Number(id_TypeDocument) } },
        statutDocument: { connect: { id: Number(id_StatutDocument) } },
        utilisateur: id_Utilisateur ? { connect: { id: Number(id_Utilisateur) } } : undefined,
      },
    });
    

    res.status(201).json(newDocument);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Error creating document', details: error.message });
  }
};



// Mettre à jour un document
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date_depot, id_TypeDocument, id_StatutDocument } = req.body;
    const fichier = req.file?.filename || null; 

    // Vérification des champs obligatoires
    if (!titre) {
      return res.status(400).json({ error: i18n.t("missingTitle") });
    }

    const updatedData = {
      titre,
      description,
      date_depot: new Date(date_depot),
      // utilisateur: { connect: { id: id_Utilisateur } },
      typeDocument: { connect: { id: id_TypeDocument } },
      statutDocument: { connect: { id: id_StatutDocument } },
    };

    if (fichier) {
      updatedData.fichier = fichier;
    }

    const updatedDocument = await prisma.document.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.json({
      message: i18n.t("updateDocumentSuccess"),
      document: updatedDocument,
    });
  } catch (error) {
    console.error(i18n.t("updateDocumentError"), error);
    res.status(500).json({ error: i18n.t("updateDocumentError"), details: error.message });
  }
};

// Supprimer un document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({
      where: { id: Number(id) },
    });

    if (!document) {
      return res.status(404).json({ error: i18n.t("documentNotFound") });
    }

    await prisma.document.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: i18n.t("deleteDocumentSuccess"),
      id: id,
    });
  } catch (error) {
    console.error(i18n.t("deleteDocumentError"), error);
    res.status(500).json({ error: i18n.t("deleteDocumentError"), details: error.message });
  }
};
