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
    res.status(500).json({ error: i18n.t("fetchStatusError"), details: error.message });
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
      return res.status(404).json({ error: i18n.t("statusNotFound") });
    }

    res.json(statutDocument);
  } catch (error) {
    console.error(i18n.t("fetchStatusError"), error);
    res.status(500).json({ error: i18n.t("fetchStatusError"), details: error.message });
  }
};

// Créer un statut de document
export const createStatutDocument = async (req, res) => {
  try {
    const { nom, description } = req.body;

    // if (!nom || !id_Utilisateur) {
    //   return res.status(400).json({ error: i18n.t("missingFields") });
    // }

    // Vérifier si l'utilisateur existe avant de créer un statut
    // const utilisateurExist = await prisma.utilisateur.findUnique({
    //   where: { id: parseInt(id_Utilisateur) },
    // });

    // if (!utilisateurExist) {
    //   return res.status(404).json({ error: i18n.t("userNotFound") });
    // }

    const newStatutDocument = await prisma.statutDocument.create({
      data: {
        nom,
        description
        // id_Utilisateur: parseInt(id_Utilisateur),
      },
    });
    res.status(201).json(newStatutDocument);
  } catch (error) {
    console.error(i18n.t("createStatusError"), error);
    res.status(500).json({ error: i18n.t("createStatusError"), details: error.message });
  }
};

export const updateStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    console.log("ID :", id);
    console.log("Nom :", nom);
    console.log("Description :", description);

    if (!nom) {
      return res.status(400).json({ error: "Le champ 'nom' est requis." });
    }

    const statutExist = await prisma.statutDocument.findUnique({
      where: { id: parseInt(id) },
    });

    if (!statutExist) {
      return res.status(404).json({ error: "Statut introuvable." });
    }

    const updatedStatutDocument = await prisma.statutDocument.update({
      where: { id: parseInt(id) },
      data: { nom, description },
    });

    console.log("Statut mis à jour :", updatedStatutDocument);
    res.json(updatedStatutDocument);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    res.status(500).json({ error: "Erreur interne du serveur.", details: error.message });
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
