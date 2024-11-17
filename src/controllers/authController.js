import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma-client.js";

// Générer un access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Générer un refresh token
// const generateRefreshToken = (user) => {
//   return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: "7d",
//   });
// };

// Enregistrement d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;

    // Vérifier le rôle
    const validRoles = ["Administrateur", "Gestionnaire RH"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rôle invalide." });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer l'utilisateur
    const newUser = await prisma.utilisateur.create({
      data: { nom, email, mot_de_passe: hashedPassword, role },
    });

    res.status(201).json({
      message: "Utilisateur enregistré avec succès.",
      user: {
        id: newUser.id,
        nom: newUser.nom,
        email: newUser.email,
        role: newUser.role,
        date_creation: newUser.date_creation,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(500).json({ message: "Échec de l'enregistrement." });
  }
};

// Connexion d'un utilisateur
export const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Trouver l'utilisateur
    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Générer les tokens
    const accessToken = generateAccessToken(user);
    // const refreshToken = generateRefreshToken(user);

    res.json({
      message: "Connexion réussie.",
      accessToken,
      // refreshToken,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        date_creation: user.date_creation,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Échec de la connexion." });
  }
};

// Obtenir les informations de l'utilisateur
export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.utilisateur.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({
      id: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role,
      date_creation: user.date_creation,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
};
