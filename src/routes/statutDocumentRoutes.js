import express from 'express';
import {
    getStatutsDocument,
    getStatutDocumentById,
    createStatutDocument,
    updateStatutDocument,
    deleteStatutDocument
} from '../controllers/statutDocumentController.js';

const router = express.Router();

// Routes
router.get('/', getStatutsDocument);
router.get('/:id', getStatutDocumentById);
router.post('/', createStatutDocument);
router.put('/:id', updateStatutDocument);
router.delete('/:id', deleteStatutDocument);

export default router;
