import prisma from '../config/prisma-client.js';
import i18n from '../config/i18next.js';

// Lire tous les statuts de documents
export const getStatutsDocument = async (req, res) => {
  try {
    const statutsDocument = await prisma.statutDocument.findMany();
    res.json(statutsDocument);
  } catch (error) {
    console.error(i18n.t("fetchStatusError"), error);
    res.status(500).json({ error: i18n.t("fetchStatusError"), details: error.message });
  }
};

// Créer un statut de document
export const createStatutDocument = async (req, res) => {
  try {
    const { nom, description, id_Utilisateur } = req.body;

    if (!nom || !id_Utilisateur) {
      return res.status(400).json({ error: i18n.t("missingFields") });
    }

    const newStatutDocument = await prisma.statutDocument.create({
      data: {
        nom,
        description,
        id_Utilisateur: parseInt(id_Utilisateur),
      },
    });
    res.status(201).json(newStatutDocument);
  } catch (error) {
    console.error(i18n.t("createStatusError"), error);
    res.status(500).json({ error: i18n.t("createStatusError"), details: error.message });
  }
};

// Mettre à jour un statut de document
export const updateStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, id_Utilisateur } = req.body;

    if (!nom) {
      return res.status(400).json({ error: i18n.t("missingNameField") });
    }

    const updatedStatutDocument = await prisma.statutDocument.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        description,
        id_Utilisateur: id_Utilisateur ? parseInt(id_Utilisateur) : undefined,
      },
    });
    res.json(updatedStatutDocument);
  } catch (error) {
    console.error(i18n.t("updateStatusError"), error);
    res.status(500).json({ error: i18n.t("updateStatusError"), details: error.message });
  }
};

// Supprimer un statut de document
export const deleteStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const statutDocument = await prisma.statutDocument.findUnique({
      where: { id: parseInt(id) },
    });

    if (!statutDocument) {
      return res.status(404).json({ error: i18n.t("statusNotFound") });
    }

    await prisma.statutDocument.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: i18n.t("deleteStatusSuccess") });
  } catch (error) {
    console.error(i18n.t("deleteStatusError"), error);
    res.status(500).json({ error: i18n.t("deleteStatusError"), details: error.message });
  }
};
