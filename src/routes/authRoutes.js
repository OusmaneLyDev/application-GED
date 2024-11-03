// src/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Ajoutez cette ligne pour la journalisation
});

// Inscription
router.post('/register', async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await prisma.utilisateur.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Enregistrer l'utilisateur
        const utilisateur = await prisma.utilisateur.create({
            data: {
                nom,
                email,
                mot_de_passe: hashedPassword,
                role
            },
        });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', utilisateur });
    } catch (err) {
        console.error(err); // Affichez l'erreur dans la console pour le débogage
        res.status(500).json({ message: 'Échec de l\'enregistrement', error: err.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, mot_de_passe } = req.body; // Utilisez mot_de_passe ici

    try {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { email } });
        if (!utilisateur) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe); // Utilisez mot_de_passe
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { userId: utilisateur.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        console.error(err); // Affichez l'erreur dans la console pour le débogage
        res.status(500).json({ message: 'Échec de la connexion', error: err.message });
    }
});

export default router;
