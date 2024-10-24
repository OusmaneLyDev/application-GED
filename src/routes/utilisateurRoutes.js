const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.post('/', utilisateurController.createUtilisateur);

router.get('/', utilisateurController.getUtilisateurs);


module.exports = router;
