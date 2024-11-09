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

// Créer un nouveau document
export const createDocument = async (req, res) => {
  try {
    const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = req.body;

    // Ajouter des journaux de débogage
    console.log('Req body received:', req.body);
    console.log('Titre:', titre);
    console.log('Description:', description);
    console.log('Date de dépôt:', date_depot);
    console.log('ID Utilisateur:', id_Utilisateur);
    console.log('ID Type Document:', id_TypeDocument);
    console.log('ID Statut Document:', id_StatutDocument);

    // Condition de vérification des champs
    if (!titre || !id_Utilisateur || !id_TypeDocument || !id_StatutDocument || !date_depot) {
      return res.status(400).json({ error: i18n.t("missingFields") });
    }

    const newDocument = await prisma.document.create({
      data: {
        titre,
        description,
        date_depot: new Date(date_depot),
        utilisateur: { connect: { id: Number(id_Utilisateur) } },
        typeDocument: { connect: { id: Number(id_TypeDocument) } },
        statutDocument: { connect: { id: Number(id_StatutDocument) } },
      },
    });
    res.status(201).json(newDocument);
  } catch (error) {
    console.error(i18n.t("createDocumentError"), error);
    res.status(500).json({ error: i18n.t("createDocumentError"), details: error.message });
  }
};


// Mettre à jour un document existant
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date_depot, id_Utilisateur, id_TypeDocument, id_StatutDocument } = req.body;

    if (!titre) {
      return res.status(400).json({ error: i18n.t("missingTitle") });
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
    res.json({ message: i18n.t("deleteDocumentSuccess") });
  } catch (error) {
    console.error(i18n.t("deleteDocumentError"), error);
    res.status(500).json({ error: i18n.t("deleteDocumentError"), details: error.message });
  }
};
