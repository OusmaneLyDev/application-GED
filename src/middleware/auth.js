// app.js
import express from 'express';
import authRoutes from './routes/auth.js'; // Exemple de routes d'authentification
import { authenticate } from './middlewares/auth.js';

const app = express();
const PORT = process.env.PORT || 3050;

app.use(express.json());
app.use('/auth', authRoutes);

// Routes protégées
app.get('/utilisateurs', authenticate, getUtilisateurs); // Ajoute le middleware ici

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
