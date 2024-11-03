// src/app.js
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'; 
import documentRoutes from './src/routes/documentRoutes.js'; 
import utilisateurRoutes from './src/routes/utilisateurRoutes.js'; 
import typeDocumentRoutes from './src/routes/typeDocumentRoutes.js';
import statutDocumentRoutes from './src/routes/statutDocumentRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // Importer les routes d'authentification

import i18next from './src/config/i18next.js';

dotenv.config();

const app = express(); 
const prisma = new PrismaClient(); 
app.use(cors());

// Correction de la syntaxe
i18next.changeLanguage('en').then(() => {
    app.use(express.json());

    // Routes
    app.use('/api/auth', authRoutes); // Ajouter les routes d'authentification
    app.use('/api/documents', documentRoutes);
    app.use('/api/utilisateurs', utilisateurRoutes);
    app.use('/api/types-document', typeDocumentRoutes);
    app.use('/api/statuts-document', statutDocumentRoutes);

    // Middleware pour les routes non trouvées
    app.use((req, res, next) => {
        res.status(404).json({ message: 'Route non trouvée' });
    });

    // Middleware pour la gestion des erreurs
    app.use((error, req, res, next) => {
        console.error(error); 
        res.status(500).json({ message: 'Erreur du serveur' });
    });

    const port = process.env.PORT || 3051; 
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
});
