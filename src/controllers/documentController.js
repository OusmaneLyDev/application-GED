import prisma from '../config/prisma-client.js';
import i18n from '../config/i18next.js';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

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
    res.status(500).json({
      error: i18n.t("fetchDocumentsError"),
      details: error.message,
    });
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
    res.status(500).json({
      error: i18n.t("fetchDocumentError"),
      details: error.message,
    });
  }
};


export const downloadDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const uploadFolder = path.join('public', process.env.DEFAULT_UPLOAD_FOLDER);
    const filePath = path.join(uploadFolder, documentId);

    if (fs.existsSync(filePath)) {
      res.download(filePath, documentId);
    } else {
      res.status(404).json({ error: i18n.t("fileNotFound") });
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: i18n.t("downloadFileError") });
  }
};

export const createDocument = async (req, res) => {
  try {
    const { titre, description, date_depot, id_TypeDocument, id_StatutDocument, id_Utilisateur } = req.body;

    // Validation checks
    if (!titre) return res.status(400).json({ error: i18n.t("missingTitle") });
    if (!id_TypeDocument || isNaN(Number(id_TypeDocument))) {
      return res.status(400).json({ error: i18n.t("missingTypeDocument") });
    }
    if (!id_StatutDocument || isNaN(Number(id_StatutDocument))) {
      return res.status(400).json({ error: i18n.t("missingStatutDocument") });
    }

    
    const data = {
      titre,
      description,
      date_depot: date_depot ? new Date(date_depot) : new Date(),
      typeDocument: { connect: { id: Number(id_TypeDocument) } },
      statutDocument: { connect: { id: Number(id_StatutDocument) } },
      utilisateur: id_Utilisateur ? { connect: { id: Number(id_Utilisateur) } } : undefined,
    };

    // Handle file upload
    if (req.files && req.files.file) {
      const uploadedFile = req.files.file;
      const fileExtension = path.extname(uploadedFile.name);
      const newFileName = `${uuidv4()}${fileExtension}`;
      const uploadFolder = path.join('public', process.env.DEFAULT_UPLOAD_FOLDER);

      await uploadedFile.mv(path.join(uploadFolder, newFileName));
      data.fichier = newFileName;
    }

    const newDocument = await prisma.document.create({ data });
    res.status(201).json(newDocument);
  } catch (error) {
    console.error(i18n.t("createDocumentError"), error);
    res.status(500).json({
      error: i18n.t("createDocumentError"),
      details: error.message,
    });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date_depot, id_TypeDocument, id_StatutDocument, id_Utilisateur } = req.body;

    const existingDocument = await prisma.document.findUnique({ where: { id: Number(id) } });
    if (!existingDocument) {
      return res.status(404).json({ error: i18n.t("documentNotFound") });
    }

    const updatedData = {
      titre,
      description,
      // Si la date_depot n'est pas fournie, on garde celle qui est déjà présente dans le document
      date_depot: date_depot ? new Date(date_depot) : existingDocument.date_depot,
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
    res.status(500).json({
      error: i18n.t("updateDocumentError"),
      details: error.message,
    });
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
    res.status(500).json({
      error: i18n.t("deleteDocumentError"),
      details: error.message,
    });
  }
};
