import express from 'express';
import {
    getStatutsDocument,
    getStatutDocumentById,
    createStatutDocument,
    updateStatutDocument,
    deleteStatutDocument
} from '../controllers/statutDocumentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { statutDocumentSchema } from '../validators/statutDocumentValidator.js';


const router = express.Router();

// Routes
router.get('/',authenticateToken, getStatutsDocument);
router.get('/:id',authenticateToken, getStatutDocumentById);
router.post('/',authenticateToken, validate(statutDocumentSchema), createStatutDocument);
router.put('/:id',authenticateToken, updateStatutDocument);
router.delete('/:id',authenticateToken, deleteStatutDocument);

export default router;
