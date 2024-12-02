import prisma from '../config/prisma-client.js';
import i18n from '../config/i18next.js';

// Lire tous les statuts de documents
export const getStatutsDocument = async (req, res) => {
  try {
    const statutsDocument = await prisma.statutDocument.findMany();
    if (!statutsDocument || statutsDocument.length === 0) {
      return res.status(404).json({ error: i18n.t("noStatusesFound") });
    }
    res.json(statutsDocument);
  } catch (error) {
    console.error(i18n.t("fetchStatusError"), error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des statuts de document. Veuillez réessayer plus tard.",
      details: error.message,
    });
  }
};

// Lire un statut de document par ID
export const getStatutDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const statutDocument = await prisma.statutDocument.findUnique({
      where: { id: parseInt(id) },
    });

    if (!statutDocument) {
      return res.status(404).json({ error: "Le statut demandé est introuvable." });
    }

    res.json(statutDocument);
  } catch (error) {
    console.error("Erreur lors de la récupération du statut par ID :", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération du statut. Veuillez réessayer.",
      details: error.message,
    });
  }
};

// Créer un statut de document
export const createStatutDocument = async (req, res) => {
  try {
    const { nom, description } = req.body;

    if (!nom) {
      return res.status(400).json({ error: "Le champ 'nom' est requis pour créer un statut." });
    }

    const newStatutDocument = await prisma.statutDocument.create({
      data: {
        nom,
        description,
      },
    });

    res.status(201).json({
      message: "Statut de document créé avec succès.",
      statut: newStatutDocument,
    });
  } catch (error) {
    console.error("Erreur lors de la création du statut :", error);
    res.status(500).json({
      error: "Impossible de créer le statut de document. Veuillez réessayer plus tard.",
      details: error.message,
    });
  }
};

// Mettre à jour un statut de document
export const updateStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    if (!nom) {
      return res.status(400).json({ error: "Le champ 'nom' est requis pour mettre à jour le statut." });
    }

    const statutExist = await prisma.statutDocument.findUnique({
      where: { id: parseInt(id) },
    });

    if (!statutExist) {
      return res.status(404).json({ error: "Le statut demandé est introuvable." });
    }

    const updatedStatutDocument = await prisma.statutDocument.update({
      where: { id: parseInt(id) },
      data: { nom, description },
    });

    res.json({
      message: "Statut de document mis à jour avec succès.",
      statut: updatedStatutDocument,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la mise à jour du statut. Veuillez réessayer plus tard.",
      details: error.message,
    });
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
      return res.status(404).json({ error: "Le statut demandé est introuvable." });
    }

    await prisma.statutDocument.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Le statut de document a été supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du statut :", error);
    res.status(500).json({
      error: "Impossible de supprimer le statut de document. Le type est associé deja a un document.",
      details: error.message,
    });
  }
};
