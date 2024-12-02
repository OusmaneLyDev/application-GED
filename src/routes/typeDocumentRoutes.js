import express from 'express';
import {
  getTypesDocument,
  getTypeDocumentById,
  createTypeDocument,
  updateTypeDocument,
  deleteTypeDocument,
} from '../controllers/typeDocumentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { typeDocumentValidator } from '../validators/typeDocumentValidator.js'; // Import du validateur
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
router.get('/', authenticateToken, getTypesDocument);
router.get('/:id', authenticateToken, getTypeDocumentById);
router.post(
  '/',
  authenticateToken,
  typeDocumentValidator, // Validation des données
  validateRequest, // Gestion des erreurs
  createTypeDocument
);
router.put(
  '/:id',
  authenticateToken,
  typeDocumentValidator,
  validateRequest,
  updateTypeDocument
);
router.delete('/:id', authenticateToken, deleteTypeDocument);

export default router;
