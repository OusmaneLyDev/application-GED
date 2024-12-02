import express from 'express';
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentById,
} from '../controllers/documentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { documentValidator } from '../validators/documentValidator.js'; // Import du validateur
import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware pour gérer les erreurs de validation
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.get('/', authenticateToken, getDocuments);
router.get('/:id', authenticateToken, getDocumentById);
router.post(
  '/',
  authenticateToken,
  documentValidator, // Validation des données
  validateRequest, // Gestion des erreurs
  createDocument
);
router.put(
  '/:id',
  authenticateToken,
  documentValidator,
  validateRequest,
  updateDocument
);
router.delete('/:id', authenticateToken, deleteDocument);

export default router;
