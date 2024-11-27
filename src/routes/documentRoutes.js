import express from 'express';
import { PrismaClient } from '@prisma/client';
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
} from '../controllers/documentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
// import validate from '../middleware/validateMiddleware.js';
// import { documentSchema } from '../validators/documentValidator.js';

const router = express.Router();

// Routes
router.get('/',authenticateToken, getDocuments);
router.post('/',createDocument);
router.put('/:id',authenticateToken, updateDocument);
router.delete('/:id',authenticateToken, deleteDocument);

router.get('/:id',authenticateToken, getDocumentById);

export default router;

