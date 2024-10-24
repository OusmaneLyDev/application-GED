// // controllers/utilisateurController.js
// import prisma from '../config/prisma-client.js';  // Assure-toi que Prisma est bien configuré

// // Lire tous les utilisateurs
// const getUtilisateurs = async (req, res) => {
//   try {
//     const utilisateurs = await prisma.utilisateur.findMany();  // Récupération de tous les utilisateurs
//     res.json(utilisateurs);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
//   }
// };

// // Lire un utilisateur par ID
// const getUtilisateurById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const utilisateur = await prisma.utilisateur.findUnique({
//       where: { id: parseInt(id) }
//     });
//     if (utilisateur) {
//       res.json(utilisateur);
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
//   }
// };

// // Créer un nouvel utilisateur
// const createUtilisateur = async (req, res) => {
//   try {
//     const { nom, prenom, email } = req.body;
//     const newUtilisateur = await prisma.utilisateur.create({
//       data: { nom, prenom, email }
//     });
//     res.status(201).json(newUtilisateur);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
//   }
// };

// // Mettre à jour un utilisateur existant
// const updateUtilisateur = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nom, prenom, email } = req.body;
//     const updatedUtilisateur = await prisma.utilisateur.update({
//       where: { id: parseInt(id) },
//       data: { nom, prenom, email }
//     });
//     res.json(updatedUtilisateur);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
//   }
// };

// // Supprimer un utilisateur
// const deleteUtilisateur = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.utilisateur.delete({
//       where: { id: parseInt(id) }
//     });
//     res.status(204).send();  // Pas de contenu à renvoyer
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
//   }
// };

// // Exporter les fonctions pour les utiliser dans les routes
// export default {
//   getUtilisateurs,
//   getUtilisateurById,
//   createUtilisateur,
//   updateUtilisateur,
//   deleteUtilisateur
// };

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};
