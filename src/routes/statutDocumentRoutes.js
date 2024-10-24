import express from 'express';
import prisma from '../config/prisma-client.js'; // Assure-toi que le chemin est correct

const router = express.Router();

// Récupérer tous les statuts de documents
const getStatutsDocument = async (req, res) => {
    try {
        const statuts = await prisma.statutDocument.findMany();
        res.status(200).json(statuts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des statuts de documents', error });
    }
};

// Créer un nouveau statut de document
const createStatutDocument = async (req, res) => {
    const { nom, description, id_Utilisateur } = req.body;

    try {
        const newStatut = await prisma.statutDocument.create({
            data: {
                nom,
                description,
                utilisateur: {
                    connect: { id: id_Utilisateur },
                },
            },
        });
        res.status(201).json(newStatut);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du statut de document', error });
    }
};

// Mettre à jour un statut de document existant
const updateStatutDocument = async (req, res) => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedStatut = await prisma.statutDocument.update({
            where: { id: parseInt(id) },
            data: {
                nom,
                description,
            },
        });
        res.status(200).json(updatedStatut);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de document', error });
    }
};

// Supprimer un statut de document
const deleteStatutDocument = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.statutDocument.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // Pas de contenu à renvoyer
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du statut de document', error });
    }
};

// Routes
router.get('/', getStatutsDocument);
router.post('/', createStatutDocument);
router.put('/:id', updateStatutDocument);
router.delete('/:id', deleteStatutDocument);

export default router;
