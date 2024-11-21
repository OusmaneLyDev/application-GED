import prisma from '../config/prisma-client.js';
import i18n from '../config/i18next.js';

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

    if (!titre) {
      return res.status(400).json({ error: i18n.t("missingTitle") });
    }
    if (!id_TypeDocument || isNaN(Number(id_TypeDocument))) {
      return res.status(400).json({ error: i18n.t("missingTypeDocument") });
    }
    if (!id_StatutDocument || isNaN(Number(id_StatutDocument))) {
      return res.status(400).json({ error: i18n.t("missingStatutDocument") });
    }

    const fichier = req.file?.filename || null;
    const data = {
      titre,
      description,
      date_depot: date_depot ? new Date(date_depot) : new Date(),
      fichier,
      typeDocument: { connect: { id: Number(id_TypeDocument) } },
      statutDocument: { connect: { id: Number(id_StatutDocument) } },
      utilisateur: id_Utilisateur ? { connect: { id: Number(id_Utilisateur) } } : undefined,
    };

    const newDocument = await prisma.document.create({ data });
    res.status(201).json(newDocument);
  } catch (error) {
    console.error(i18n.t("createDocumentError"), error);
    res.status(500).json({ error: i18n.t("createDocumentError"), details: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date_depot, id_TypeDocument, id_StatutDocument, id_Utilisateur } = req.body;
    const fichier = req.file?.filename || null;

    const existingDocument = await prisma.document.findUnique({ where: { id: Number(id) } });
    if (!existingDocument) {
      return res.status(404).json({ error: i18n.t("documentNotFound") });
    }

    const updatedData = {
      titre,
      description,
      date_depot: date_depot ? new Date(date_depot) : undefined,
      fichier: fichier || undefined,
      typeDocument: id_TypeDocument ? { connect: { id: Number(id_TypeDocument) } } : undefined,
      statutDocument: id_StatutDocument ? { connect: { id: Number(id_StatutDocument) } } : undefined,
      utilisateur: id_Utilisateur ? { connect: { id: Number(id_Utilisateur) } } : undefined,
    };

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

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findUnique({ where: { id: Number(id) } });
    if (!document) {
      return res.status(404).json({ error: i18n.t("documentNotFound") });
    }

    await prisma.document.delete({ where: { id: Number(id) } });

    res.json({ message: i18n.t("deleteDocumentSuccess"), id });
  } catch (error) {
    console.error(i18n.t("deleteDocumentError"), error);
    res.status(500).json({ error: i18n.t("deleteDocumentError"), details: error.message });
  }
};
