import express from 'express';
import {
    getUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateur,
    deleteUtilisateur
} from '../controllers/utilisateurController.js'; 
// import { utilisateurSchema } from '../validators/index.js'; 
// import validate from '../middleware/validateMiddleware.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; 


const router = express.Router();

// Définir les routes
router.get('/', authenticateToken, getUtilisateurs); 
router.get('/:id', authenticateToken, getUtilisateurById); 
router.post('/', authenticateToken, createUtilisateur); 
router.put('/:id', authenticateToken, updateUtilisateur); 
router.delete('/:id', authenticateToken, deleteUtilisateur); 

export default router;
