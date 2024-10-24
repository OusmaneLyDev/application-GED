import prisma from '../config/prisma-client.js';

// Lire tous les types de documents
export const getTypesDocument = async (req, res) => {
  try {
    const typesDocument = await prisma.typeDocument.findMany();
    res.json(typesDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des types de documents.' });
  }
};

// Créer un type de document
export const createTypeDocument = async (req, res) => {
  try {
    const { nom, description, id_Utilisateur } = req.body;
    const newTypeDocument = await prisma.typeDocument.create({
      data: {
        nom,
        description,
        id_Utilisateur,
      },
    });
    res.json(newTypeDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du type de document.' });
  }
};

// Mettre à jour un type de document
export const updateTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, id_Utilisateur } = req.body;
    const updatedTypeDocument = await prisma.typeDocument.update({
      where: { id: parseInt(id) },
      data: { nom, description, id_Utilisateur },
    });
    res.json(updatedTypeDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du type de document.' });
  }
};

// Supprimer un type de document
export const deleteTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.typeDocument.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Type de document supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du type de document.' });
  }
};
