import express from 'express';
import { PrismaClient } from '@prisma/client';
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument
} from '../controllers/documentController.js';

const router = express.Router();
const prisma = new PrismaClient();

// Routes
router.get('/', getDocuments);
router.post('/', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
