import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'; 
import documentRoutes from './src/routes/documentRoutes.js'; 
import utilisateurRoutes from './src/routes/utilisateurRoutes.js'; 
import typeDocumentRoutes from './src/routes/typeDocumentRoutes.js';
import statutDocumentRoutes from './src/routes/statutDocumentRoutes.js'; 

import i18n from './config/i18n.js';
dotenv.config();

const app = express(); // Créer une instance d'Express
const prisma = new PrismaClient(); // Initialiser Prisma Client

app.use(i18n.init);
app.use(express.json());

app.use('/api/documents', documentRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/types-document', typeDocumentRoutes);
app.use('/api/statuts-document', statutDocumentRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.use((error, req, res, next) => {
  console.error(error); 
  res.status(500).json({ message: 'Erreur du serveur' });
});

const port = process.env.PORT || 3051; 
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
