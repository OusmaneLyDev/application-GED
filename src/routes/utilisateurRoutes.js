import express from 'express';
import {
  getUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
} from '../controllers/utilisateurController.js';
import { utilisateurValidator } from '../validators/utilisateurValidator.js'; // Import du validateur
import { validationResult } from 'express-validator'; // Pour traiter les erreurs de validation
import { authenticateToken } from '../middleware/authMiddleware.js'; // Middleware pour l'authentification

const router = express.Router();

// Middleware de validation
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes avec validation et authentification
router.get('/', authenticateToken, getUtilisateurs);

router.get('/:id', authenticateToken, getUtilisateurById);

router.post(
  '/',
  authenticateToken,
  utilisateurValidator, // Ajout du validateur
  validateRequest, // Vérification des erreurs de validation
  createUtilisateur
);

router.put(
  '/:id',
  authenticateToken,
  utilisateurValidator, // Réutilisation du validateur pour les mises à jour
  validateRequest,
  updateUtilisateur
);

router.delete('/:id', authenticateToken, deleteUtilisateur);

export default router;
