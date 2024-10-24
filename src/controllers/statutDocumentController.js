import prisma from '../config/prisma-client.js';

// Lire tous les statuts de documents
export const getStatutsDocument = async (req, res) => {
  try {
    const statutsDocument = await prisma.statutDocument.findMany();
    res.json(statutsDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statuts de documents.' });
  }
};

// Créer un statut de document
export const createStatutDocument = async (req, res) => {
  try {
    const { nom, description, id_Utilisateur } = req.body;
    const newStatutDocument = await prisma.statutDocument.create({
      data: {
        nom,
        description,
        id_Utilisateur,
      },
    });
    res.json(newStatutDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du statut de document.' });
  }
};

// Mettre à jour un statut de document
export const updateStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, id_Utilisateur } = req.body;
    const updatedStatutDocument = await prisma.statutDocument.update({
      where: { id: parseInt(id) },
      data: { nom, description, id_Utilisateur },
    });
    res.json(updatedStatutDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut de document.' });
  }
};

// Supprimer un statut de document
export const deleteStatutDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.statutDocument.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Statut de document supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du statut de document.' });
  }
};
