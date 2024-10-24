// import express from 'express';
// import utilisateurController from '../controllers/utilisateurController.js'; // Assure-toi que le chemin est correct

// const router = express.Router();

// // Définir les routes
// router.get('/', utilisateurController.getUtilisateurs); // Lire tous les utilisateurs
// router.get('/:id', utilisateurController.getUtilisateurById); // Lire un utilisateur par ID
// router.post('/', utilisateurController.createUtilisateur); // Créer un nouvel utilisateur
// router.put('/:id', utilisateurController.updateUtilisateur); // Mettre à jour un utilisateur existant
// router.delete('/:id', utilisateurController.deleteUtilisateur); // Supprimer un utilisateur

// export default router;

import { Router } from 'express';
import { getUtilisateurs } from '../controllers/utilisateurController.js';

const router = Router();

router.get('/utilisateurs', getUtilisateurs);

export default router;
