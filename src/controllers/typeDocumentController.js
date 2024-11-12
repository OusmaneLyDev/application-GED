import prisma from '../config/prisma-client.js';  
import i18n from '../config/i18next.js';

// Vérification de l'ID (parseInt + validation)
const validateId = (id) => {
  const parsedId = parseInt(id, 10);
  return !isNaN(parsedId) && parsedId > 0 ? parsedId : null;
};

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
    const validId = validateId(id);

    if (!validId) {
      return res.status(400).json({ error: i18n.t('invalidId') });
    }

    const typeDocument = await prisma.typeDocument.findUnique({
      where: { id: validId }
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

// Mettre à jour un type de document
export const updateTypeDocument = async (req, res) => {
  try {
    const id = validateId(req.params.id);
    const { nom, description } = req.body;

    if (!id) {
      return res.status(400).json({ error: i18n.t('invalidId') });
    }

    if (!nom) {
      return res.status(400).json({ error: i18n.t('missingName') });
    }

    const existingTypeDocument = await prisma.typeDocument.findUnique({ where: { id } });
    if (!existingTypeDocument) {
      return res.status(404).json({ error: i18n.t('documentNotFound') });
    }

    const updatedTypeDocument = await prisma.typeDocument.update({
      where: { id },
      data: { nom, description }
    });

    res.json(updatedTypeDocument);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du type de document :", error);
    res.status(500).json({ error: i18n.t('updateTypeDocumentError'), details: error.message });
  }
};

// Supprimer un type de document
export const deleteTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const validId = validateId(id);

    if (!validId) {
      return res.status(400).json({ error: i18n.t('invalidId') });
    }

    const documentsAssocies = await prisma.document.count({
      where: {
        id_TypeDocument: validId,
        id_StatutDocument: 1 // Remplacez '1' par l'ID réel correspondant au statut "actif"
      }
    });

    if (documentsAssocies > 0) {
      return res.status(400).json({ error: i18n.t('deleteTypeDocumentErrorActiveDocuments') });
    }

    await prisma.typeDocument.delete({
      where: { id: validId }
    });

    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du type de document :", error);
    res.status(500).json({ error: i18n.t('deleteTypeDocumentError'), details: error.message });
  }
};
