import prisma from '../config/prisma-client.js';  
import i18n from '../config/i18next.js';

// Récupérer tous les types de documents
export const getTypesDocument = async (req, res) => {
  try {
    const typesDocument = await prisma.typeDocument.findMany();
    res.json(typesDocument);  
  } catch (error) {
    res.status(500).json({ error: i18n.t('getTypesDocumentError') });
  }
};

// Récupérer un type de document par ID
export const getTypeDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const typeDocument = await prisma.typeDocument.findUnique({
      where: { id: parseInt(id) }
    });
    if (typeDocument) {
      res.json(typeDocument);
    } else {
      res.status(404).json({ error: i18n.t('typeDocumentNotFound') });
    }
  } catch (error) {
    res.status(500).json({ error: i18n.t('getTypeDocumentByIdError') });
  }
};

// Créer un nouveau type de document
export const createTypeDocument = async (req, res) => {
  try {
    const { nom, description, id_Utilisateur } = req.body;

    if (!nom || !id_Utilisateur) {
      return res.status(400).json({ error: i18n.t('missingFields') });
    }

    const newTypeDocument = await prisma.typeDocument.create({
      data: {
        nom,
        description,
        id_Utilisateur: parseInt(id_Utilisateur)
      }
    });

    res.status(201).json(newTypeDocument);
  } catch (error) {
    console.error(i18n.t("createTypeDocumentError"), error);
    res.status(500).json({ error: i18n.t("createTypeDocumentError"), details: error.message });
  }
};

// Mettre à jour un type de document existant
export const updateTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    if (!nom) {
      return res.status(400).json({ error: i18n.t('missingName') });
    }

    const updatedTypeDocument = await prisma.typeDocument.update({
      where: { id: parseInt(id) },
      data: { nom, description }
    });
    res.json(updatedTypeDocument);
  } catch (error) {
    res.status(500).json({ error: i18n.t('updateTypeDocumentError') });
  }
};

// Supprimer un type de document (vérification des documents associés)
export const deleteTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const documentsAssocies = await prisma.document.count({
      where: { typeDocumentId: parseInt(id), statut: 'actif' }
    });
    if (documentsAssocies > 0) {
      return res.status(400).json({ error: i18n.t('deleteTypeDocumentErrorActiveDocuments') });
    }

    await prisma.typeDocument.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();  
  } catch (error) {
    res.status(500).json({ error: i18n.t('deleteTypeDocumentError') });
  }
};
