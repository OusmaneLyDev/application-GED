import express from 'express';
import {
    getTypesDocument,
    getTypeDocumentById,
    createTypeDocument,
    updateTypeDocument,
    deleteTypeDocument
} from '../controllers/typeDocumentController.js';

const router = express.Router();

// Routes
router.get('/', getTypesDocument);
router.get('/:id', getTypeDocumentById);
router.post('/', createTypeDocument);
router.put('/:id', updateTypeDocument);
router.delete('/:id', deleteTypeDocument);

export default router;
