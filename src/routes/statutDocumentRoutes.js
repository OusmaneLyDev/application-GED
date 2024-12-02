import express from 'express';
import {
  getStatutsDocument,
  getStatutDocumentById,
  createStatutDocument,
  updateStatutDocument,
  deleteStatutDocument,
} from '../controllers/statutDocumentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { statutDocumentValidator } from '../validators/statutDocumentValidator.js'; // Import du validateur
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
router.get('/', authenticateToken, getStatutsDocument);
router.get('/:id', authenticateToken, getStatutDocumentById);
router.post(
  '/',
  authenticateToken,
  statutDocumentValidator, // Validation des données
  validateRequest, // Gestion des erreurs
  createStatutDocument
);
router.put(
  '/:id',
  authenticateToken,
  statutDocumentValidator,
  validateRequest,
  updateStatutDocument
);
router.delete('/:id', authenticateToken, deleteStatutDocument);

export default router;
