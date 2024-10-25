import prisma from '../config/prisma-client.js';

// Lire tous les statuts de documents
export const getStatutsDocument = async (req, res) => {
  try {
    const statutsDocument = await prisma.statutDocument.findMany();
    res.json(statutsDocument);
  } catch (error) {
    console.error("Erreur détaillée:", error); // Affichez l'erreur dans la console
    res.status(500).json({ error: 'Erreur lors de la récupération des statuts de documents.', details: error.message });
  }
};

// Créer un statut de document
export const createStatutDocument = async (req, res) => {
  try {
    const { nom, description, id_Utilisateur } = req.body;

    // Vérifier la présence des champs requis
    if (!nom || !id_Utilisateur) {
      return res.status(400).json({ error: 'Les champs "nom" et "id_Utilisateur" sont requis.' });
    }

    const newStatutDocument = await prisma.statutDocument.create({
      data: {
        nom,
        description,
        id_Utilisateur: parseInt(id_Utilisateur),  // Assurez-vous que c'est bien un entier
      },
    });
    res.status(201).json(newStatutDocument);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({ error: 'Erreur lors de la création du statut de document.', details: error.message });
  }
};

// Mettre à jour un statut de document
export const updateStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, id_Utilisateur } = req.body;

    // Vérifier la présence du champ requis "nom"
    if (!nom) {
      return res.status(400).json({ error: 'Le champ "nom" est requis.' });
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
    console.error("Erreur détaillée:", error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut de document.', details: error.message });
  }
};

// Supprimer un statut de document
export const deleteStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le statut existe avant de le supprimer
    const statutDocument = await prisma.statutDocument.findUnique({
      where: { id: parseInt(id) },
    });

    if (!statutDocument) {
      return res.status(404).json({ error: 'Statut de document non trouvé.' });
    }

    await prisma.statutDocument.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Statut de document supprimé avec succès.' });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({ error: 'Erreur lors de la suppression du statut de document.', details: error.message });
  }
};
