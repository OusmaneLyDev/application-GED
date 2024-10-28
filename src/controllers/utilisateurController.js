import prisma from '../config/prisma-client.js';
import i18n from '../config/i18next.js';

// Lire tous les utilisateurs
export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    if (utilisateurs.length === 0) {
      return res.status(404).json({ message: i18n.t('noUsersFound') });
    }
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: i18n.t('getUsersError') });
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
      return res.status(404).json({ message: i18n.t('userNotFound') });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: i18n.t('getUserByIdError') });
  }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    
    // Vérifier la présence des champs requis
    if (!nom || !email || !mot_de_passe || !role) {
      return res.status(400).json({ message: i18n.t('allFieldsRequired') });
    }

    const newUtilisateur = await prisma.utilisateur.create({
      data: { nom, email, mot_de_passe, role }
    });

    res.status(201).json({
      message: i18n.t('userCreatedSuccess'),
      utilisateur: newUtilisateur
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      return res.status(400).json({ message: i18n.t('emailInUse') });
    }
    res.status(500).json({ error: i18n.t('createUserError') });
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
      return res.status(404).json({ message: i18n.t('userNotFoundForUpdate') });
    }

    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: { nom, email, mot_de_passe, role }
    });

    res.status(200).json({
      message: i18n.t('userUpdatedSuccess'),
      utilisateur: updatedUtilisateur
    });
  } catch (error) {
    res.status(500).json({ error: i18n.t('updateUserError') });
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
      return res.status(404).json({ message: i18n.t('userNotFoundForDelete') });
    }

    await prisma.utilisateur.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: i18n.t('userDeletedSuccess') });
  } catch (error) {
    res.status(500).json({ error: i18n.t('deleteUserError') });
  }
};
