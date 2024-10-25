import prisma from '../config/prisma-client.js';

// Lire tous les utilisateurs
export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Lire un utilisateur par son ID
export const getUtilisateurById = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) }
    });
    if (utilisateur) {
      res.json(utilisateur);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    
    // Vérifier la présence des champs requis
    if (!nom || !email || !mot_de_passe || !role) {
      return res.status(400).json({ error: 'Tous les champs requis doivent être fournis.' });
    }

    const newUtilisateur = await prisma.utilisateur.create({
      data: { nom, email, mot_de_passe, role }
    });
    res.status(201).json(newUtilisateur);
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    } else {
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
    }
  }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, mot_de_passe, role } = req.body;

    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: { nom, email, mot_de_passe, role }
    });
    res.json(updatedUtilisateur);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.utilisateur.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send(); // Pas de contenu à renvoyer
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};
