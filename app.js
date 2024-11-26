import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import utilisateurRoutes from './src/routes/utilisateurRoutes.js';
import typeDocumentRoutes from './src/routes/typeDocumentRoutes.js';
import statutDocumentRoutes from './src/routes/statutDocumentRoutes.js';
import documentRoutes from './src/routes/documentRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; // Import unique
import fileUploadConfig from './src/config/file-upload.js'; // Si dans 'src/config'
import fileUpload from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import i18next from './src/config/i18next.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const __dirname = path.resolve();

app.use(cors());
app.use(fileUpload(fileUploadConfig()));

i18next.changeLanguage('en').then(() => {
    app.use(express.json());

    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    app.post('/api/upload', async (req, res) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ message: 'No files were uploaded.' });
            }

            const uploadedFile = Object.values(req.files)[0];
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
            const fileExtension = path.extname(uploadedFile.name).substring(1).toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                return res.status(400).json({ message: 'Unsupported file type.' });
            }

            const uploadPath = path.join(uploadsDir, uploadedFile.name);
            await uploadedFile.mv(uploadPath);

            res.status(200).json({
                success: true,
                message: 'File uploaded successfully',
                name: uploadedFile.name,
                path: uploadPath,
                imageUrl: `http://localhost:${process.env.PORT || 3051}/uploads/${uploadedFile.name}`,
            });
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier :', error);
            res.status(500).json({ message: 'Failed to upload file', error: error.message });
        }
    });

    // Routes
    app.use('/api/', authRoutes);
    app.use('/api/documents', documentRoutes);
    app.use('/api/utilisateurs', utilisateurRoutes);
    app.use('/api/types-document', typeDocumentRoutes);
    app.use('/api/statuts-document', statutDocumentRoutes);

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
});
