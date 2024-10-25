import express from 'express';
import {
    getUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateur,
    deleteUtilisateur
} from '../controllers/utilisateurController.js'; // Assure-toi que le chemin est correct

const router = express.Router();

// Définir les routes
router.get('/', getUtilisateurs); 
router.get('/:id', getUtilisateurById); 
router.post('/', createUtilisateur); 
router.put('/:id', updateUtilisateur); 
router.delete('/:id', deleteUtilisateur); 

export default router;
