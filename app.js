// src/app.js
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'; 
import documentRoutes from './src/routes/documentRoutes.js'; 
import utilisateurRoutes from './src/routes/utilisateurRoutes.js'; 
import typeDocumentRoutes from './src/routes/typeDocumentRoutes.js';
import statutDocumentRoutes from './src/routes/statutDocumentRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import expressFileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';

import i18next from './src/config/i18next.js';

dotenv.config();



const app = express(); 
const prisma = new PrismaClient(); 
const __dirname = path.resolve();

app.use(cors());




// Correction de la syntaxe
i18next.changeLanguage('en').then(() => {
    app.use(express.json());
    const uploadsDir = path.join(__dirname, 'uploads');

    // Vérifier si le dossier 'uploads' existe, sinon le créer
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Crée le dossier 'uploads' s'il n'existe pas
  }

  app.use(expressFileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille de fichier (5MB)
    abortOnLimit: true,
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: uploadsDir, // Dossier temporaire pour le fichier
  }));
  
  // Route d'upload
  app.post('/api/upload', async (req, res) => {
    try {
        console.log('Requête reçue, fichiers:', req.files);

        // Vérifier si des fichiers ont été envoyés
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        // Récupérer le premier fichier (dynamique)
        const uploadedFile = Object.values(req.files)[0];
        console.log('Fichier reçu :', uploadedFile);

        // Définir le dossier de destination
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Définir le chemin complet pour sauvegarder le fichier
        const uploadPath = path.join(uploadsDir, uploadedFile.name);

        // Déplacer le fichier vers le répertoire final
        await uploadedFile.mv(uploadPath);

        // Répondre avec succès
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            name: uploadedFile.name,
            path: uploadPath,
            imageUrl: `http://localhost:3051/api/upload/${uploadedFile.name}`
        });
    } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
});

  

    // Routes
    app.use('/api/', authRoutes); // Ajouter les routes d'authentification
    app.use('/api/documents', documentRoutes);
    app.use('/api/utilisateurs', utilisateurRoutes);
    app.use('/api/types-document', typeDocumentRoutes);
    app.use('/api/statuts-document', statutDocumentRoutes);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
