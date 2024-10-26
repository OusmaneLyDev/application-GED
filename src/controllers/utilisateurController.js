import prisma from '../config/prisma-client.js';

// Lire tous les utilisateurs
export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    if (utilisateurs.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// Lire un utilisateur par son ID
export const getUtilisateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) }
    });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    
    // Vérifier la présence des champs requis
    if (!nom || !email || !mot_de_passe || !role) {
      return res.status(400).json({ message: 'Tous les champs (nom, email, mot de passe, rôle) doivent être fournis.' });
    }

    const newUtilisateur = await prisma.utilisateur.create({
      data: { nom, email, mot_de_passe, role }
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      utilisateur: newUtilisateur
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé. Veuillez en choisir un autre.' });
    }
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, mot_de_passe, role } = req.body;

    // Vérifier si l'utilisateur existe
    const utilisateurExist = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) }
    });

    if (!utilisateurExist) {
      return res.status(404).json({ message: 'Utilisateur non trouvé pour la mise à jour.' });
    }

    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: { nom, email, mot_de_passe, role }
    });

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès.',
      utilisateur: updatedUtilisateur
    });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
  }
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'utilisateur existe
    const utilisateurExist = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) }
    });

    if (!utilisateurExist) {
      return res.status(404).json({ message: 'Utilisateur non trouvé pour la suppression.' });
    }

    await prisma.utilisateur.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
  }
};
