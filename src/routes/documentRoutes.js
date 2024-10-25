import express from 'express';
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument
} from '../controllers/documentController.js';

const router = express.Router();

// Routes
router.get('/', getDocuments);
router.post('/', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
