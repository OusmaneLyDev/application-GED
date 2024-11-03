import prisma from '../config/prisma-client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const newUtilisateur = await prisma.utilisateur.create({
      data: { nom, email, mot_de_passe: hashedPassword, role }
    });

    res.status(201).json({
      message: i18n.t('userCreatedSuccess'),
      utilisateur: newUtilisateur
    });
  } catch (error) {
    console.error('Error creating user:', error);  // Logger l'erreur
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      return res.status(400).json({ message: i18n.t('emailInUse') });
    }
    res.status(500).json({ message: "Échec de l'enregistrement", error: error.message || error });
  }
};

// Authentifier un utilisateur
export const loginUtilisateur = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Vérifier la présence des champs requis
    if (!email || !mot_de_passe) {
      console.log('Champs manquants:', { email, mot_de_passe });
      return res.status(400).json({ message: i18n.t('allFieldsRequired') });
    }

    // Trouver l'utilisateur par email
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { email }
    });

    if (!utilisateur) {
      console.log('Utilisateur non trouvé avec email:', email);
      return res.status(401).json({ message: i18n.t('invalidCredentials') });
    }

    // Comparer le mot de passe fourni avec le mot de passe haché
    const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!isMatch) {
      console.log('Mot de passe incorrect pour l\'utilisateur:', email);
      return res.status(401).json({ message: i18n.t('invalidCredentials') });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: utilisateur.id, email: utilisateur.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: i18n.t('loginSuccess'), token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: i18n.t('loginError') });
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

    // Hachage du mot de passe si fourni
    const updatedData = {
      nom,
      email,
      role
    };
    
    if (mot_de_passe) {
      updatedData.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
    }

    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: updatedData
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
