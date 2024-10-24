import express from 'express';
import prisma from '../config/prisma-client.js'; // Assure-toi que le chemin est correct

const router = express.Router();

// Logic to retrieve documents
const getDocuments = async (req, res) => {
    try {
        const documents = await prisma.document.findMany(); // Assure-toi que 'document' est le bon nom de modèle
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve documents' });
    }
};

// Logic to create a new document
const createDocument = async (req, res) => {
    try {
        const newDocument = await prisma.document.create({
            data: req.body, // Assure-toi que le corps de la requête contient les bons champs
        });
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create document' });
    }
};

// Logic to update a document
const updateDocument = async (req, res) => {
    const { id } = req.params; // Assure-toi que tu passes l'ID du document dans l'URL
    try {
        const updatedDocument = await prisma.document.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(updatedDocument);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update document' });
    }
};

// Logic to delete a document
const deleteDocument = async (req, res) => {
    const { id } = req.params; // Assure-toi que tu passes l'ID du document dans l'URL
    try {
        await prisma.document.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // Réponds avec un statut 204 No Content
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete document' });
    }
};

// Routes
router.get('/', getDocuments);
router.post('/', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
