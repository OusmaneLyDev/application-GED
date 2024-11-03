// src/api/login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Inscription
router.post('/register', async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body; // Mettez à jour les noms des champs ici

    // Vérifiez la présence des champs requis
    if (!nom || !email || !mot_de_passe) {
        return res.status(400).json({ message: 'Nom, email et mot de passe sont requis' });
    }

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await prisma.utilisateur.findUnique({ where: { email } }); // Utilisez 'utilisateur'
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10); // Utilisez 'mot_de_passe'

        // Enregistrer l'utilisateur
        const utilisateur = await prisma.utilisateur.create({ // Utilisez 'utilisateur'
            data: {
                nom,
                email,
                mot_de_passe: hashedPassword,
                role,
            },
        });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', utilisateur: { id: utilisateur.id, email: utilisateur.email } });
    } catch (err) {
        console.error('Erreur d\'inscription:', err);
        res.status(500).json({ message: 'Échec de l\'inscription de l\'utilisateur' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, mot_de_passe } = req.body; // Utilisez 'mot_de_passe'

    // Vérifiez la présence des champs requis
    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis' });
    }

    try {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { email } }); // Utilisez 'utilisateur'
        if (!utilisateur) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe); // Utilisez 'mot_de_passe'
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { userId: utilisateur.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Défaut à 1h si non défini
        );

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        console.error('Erreur de connexion:', err);
        res.status(500).json({ message: 'Échec de la connexion' });
    }
});

module.exports = router;
