import express from 'express';
import {
    getTypesDocument,
    getTypeDocumentById,
    createTypeDocument,
    updateTypeDocument,
    deleteTypeDocument
} from '../controllers/typeDocumentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
// import validate from '../middleware/validateMiddleware.js'; 
// import { typeDocumentSchema } from '../validators/typeDocumentValidator.js';


 
const router = express.Router();

// Routes
router.get('/',authenticateToken, getTypesDocument);
router.get('/:id',authenticateToken, getTypeDocumentById);
router.post('/',authenticateToken, createTypeDocument);
router.put('/:id',authenticateToken, updateTypeDocument);
router.delete('/:id',authenticateToken, deleteTypeDocument);

export default router;
