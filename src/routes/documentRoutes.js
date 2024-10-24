const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Créer un document
router.post('/', documentController.createDocument);

// Obtenir tous les documents
router.get('/', documentController.getDocuments);

// Autres routes possibles (mise à jour, suppression)...

module.exports = router;
