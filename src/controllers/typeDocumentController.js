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
    if (typesDocument.length === 0) {
      return res.status(404).json({
        message: "Aucun type de document trouvé.",
        suggestion: "Ajoutez un nouveau type de document pour commencer."
      });
    }
    res.json(typesDocument);
  } catch (error) {
    console.error("Erreur lors de la récupération des types de documents :", error);
    res.status(500).json({
      message: "Impossible de récupérer les types de documents pour le moment.",
      details: error.message
    });
  }
};

// Récupérer un type de document par ID
export const getTypeDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const validId = validateId(id);

    if (!validId) {
      return res.status(400).json({
        message: "Identifiant invalide.",
        suggestion: "Assurez-vous que l'identifiant est un nombre positif."
      });
    }

    const typeDocument = await prisma.typeDocument.findUnique({
      where: { id: validId }
    });

    if (!typeDocument) {
      return res.status(404).json({
        message: `Type de document avec l'ID ${id} introuvable.`,
        suggestion: "Vérifiez l'identifiant ou ajoutez un nouveau type de document."
      });
    }

    res.json(typeDocument);
  } catch (error) {
    console.error("Erreur lors de la récupération du type de document :", error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération du type de document.",
      details: error.message
    });
  }
};

// Créer un nouveau type de document
export const createTypeDocument = async (req, res) => {
  try {
    const { nom, description } = req.body;

    if (!nom || !description) {
      return res.status(400).json({
        message: "Des champs obligatoires sont manquants.",
        requiredFields: ["nom", "description"],
        suggestion: "Fournissez un nom et une description pour créer un type de document."
      });
    }

    const newTypeDocument = await prisma.typeDocument.create({
      data: { nom, description }
    });

    res.status(201).json({
      message: "Type de document créé avec succès.",
      typeDocument: newTypeDocument
    });
  } catch (error) {
    console.error("Erreur lors de la création d'un type de document :", error);
    res.status(500).json({
      message: "Impossible de créer le type de document pour le moment.",
      details: error.message
    });
  }
};

// Mettre à jour un type de document
export const updateTypeDocument = async (req, res) => {
  try {
    const id = validateId(req.params.id);
    const { nom, description } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Identifiant invalide.",
        suggestion: "L'identifiant doit être un nombre positif."
      });
    }

    if (!nom) {
      return res.status(400).json({
        message: "Le champ 'nom' est obligatoire.",
        suggestion: "Fournissez un nom valide pour mettre à jour le type de document."
      });
    }

    const existingTypeDocument = await prisma.typeDocument.findUnique({ where: { id } });
    if (!existingTypeDocument) {
      return res.status(404).json({
        message: `Type de document avec l'ID ${id} introuvable.`,
        suggestion: "Vérifiez l'identifiant ou créez un nouveau type de document."
      });
    }

    const updatedTypeDocument = await prisma.typeDocument.update({
      where: { id },
      data: { nom, description }
    });

    res.json({
      message: "Type de document mis à jour avec succès.",
      updatedTypeDocument
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du type de document :", error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du type de document.",
      details: error.message
    });
  }
};

// Supprimer un type de document
export const deleteTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const validId = validateId(id);

    if (!validId) {
      return res.status(400).json({
        message: "Identifiant invalide.",
        suggestion: "L'identifiant doit être un nombre positif."
      });
    }

    const documentsAssocies = await prisma.document.count({
      where: {
        id_TypeDocument: validId,
        id_StatutDocument: 1 // Remplacez '1' par l'ID réel correspondant au statut "actif"
      }
    });

    if (documentsAssocies > 0) {
      return res.status(400).json({
        message: "Impossible de supprimer ce type de document.",
        reason: "Il est encore associé à des documents actifs.",
        suggestion: "Désactivez ou supprimez les documents associés avant de réessayer."
      });
    }

    await prisma.typeDocument.delete({
      where: { id: validId }
    });

    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du type de document :", error);
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du type de document.",
      details: error.message
    });
  }
};
