require('dotenv').config();
const express = require('express');
const app = express();
const prisma = require('@prisma/client');
const documentRoutes = require('./src/routes/documentRoutes');
const utilisateurRoutes = require('./src/routes/utilisateurRoutes');

app.use(express.json());


app.use('/api/documents', documentRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);

const port = process.env.PORT || 3050;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
