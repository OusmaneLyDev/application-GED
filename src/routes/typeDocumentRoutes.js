import express from 'express';
import prisma from '../config/prisma-client.js';  // Assure-toi que Prisma est bien configuré

const router = express.Router();

// Récupérer tous les types de documents
const getTypesDocument = async (req, res) => {
  try {
    const typesDocument = await prisma.typeDocument.findMany();
    res.json(typesDocument);  // Envoi de la réponse avec les types de documents
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des types de documents.' });
  }
};

// Récupérer un type de document par ID
const getTypeDocumentById = async (req, res) => {
  try {
    const { id } = req.params; 
    const typeDocument = await prisma.typeDocument.findUnique({
      where: { id: parseInt(id) }  // Recherche du type de document par ID
    });
    if (typeDocument) {
      res.json(typeDocument);
    } else {
      res.status(404).json({ error: 'Type de document non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du type de document.' });
  }
};

// Créer un nouveau type de document
const createTypeDocument = async (req, res) => {
  try {
    const { libelle } = req.body;  // Récupération des données du corps de la requête
    const newTypeDocument = await prisma.typeDocument.create({
      data: { libelle }  // Insérer les données
    });
    res.status(201).json(newTypeDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du type de document.' });
  }
};

// Mettre à jour un type de document existant
const updateTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;  // Récupération de l'ID depuis les paramètres de la requête
    const { libelle } = req.body;  // Récupération des données à mettre à jour depuis le corps de la requête

    // Mise à jour du type de document
    const updatedTypeDocument = await prisma.typeDocument.update({
      where: { id: parseInt(id) },  // Trouver par ID
      data: { libelle }  // Mettre à jour avec les nouvelles données
    });
    res.json(updatedTypeDocument);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du type de document.' });
  }
};

// Supprimer un type de document
const deleteTypeDocument = async (req, res) => {
  try {
    const { id } = req.params;  
    await prisma.typeDocument.delete({
      where: { id: parseInt(id) }  // Supprimer par ID
    });
    res.status(204).send();  // Pas de contenu à renvoyer
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du type de document.' });
  }
};

// Routes
router.get('/', getTypesDocument);
router.get('/:id', getTypeDocumentById);
router.post('/', createTypeDocument);
router.put('/:id', updateTypeDocument);
router.delete('/:id', deleteTypeDocument);

export default router;
