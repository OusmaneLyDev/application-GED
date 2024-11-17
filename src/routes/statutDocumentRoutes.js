import express from 'express';
import {
    getStatutsDocument,
    getStatutDocumentById,
    createStatutDocument,
    updateStatutDocument,
    deleteStatutDocument
} from '../controllers/statutDocumentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

// Routes
router.get('/',authenticateToken, getStatutsDocument);
router.get('/:id',authenticateToken, getStatutDocumentById);
router.post('/',authenticateToken, createStatutDocument);
router.put('/:id',authenticateToken, updateStatutDocument);
router.delete('/:id',authenticateToken, deleteStatutDocument);

export default router;
