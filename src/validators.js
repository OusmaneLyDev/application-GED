const Joi = require('joi');

// Validation pour le modèle Utilisateur
const utilisateurSchema = Joi.object({
  nom: Joi.string().max(50).required(),
  email: Joi.string().email({ 
    minDomainSegments: 2, // Le domaine doit avoir au moins 2 segments (ex: example.com)
    tlds: { allow: ['com', 'net', 'org', 'fr'] } // Optionnel : Limiter les domaines autorisés
  }).max(50).required(),
  mot_de_passe: Joi.string().min(8).max(50).required(),
  role: Joi.string().max(50).required(),
  date_creation: Joi.date().default(Date.now),
});

// Validation pour le modèle TypeDocument
const typeDocumentSchema = Joi.object({
  nom: Joi.string().max(50).required(),
  description: Joi.string().max(255).optional(),
  id_Utilisateur: Joi.number().integer().required(),
});

// Validation pour le modèle StatutDocument
const statutDocumentSchema = Joi.object({
  nom: Joi.string().max(20).required(),
  description: Joi.string().max(255).optional(),
  id_Utilisateur: Joi.number().integer().required(),
});

// Validation pour le modèle Document
const documentSchema = Joi.object({
  titre: Joi.string().max(100).required(),
  description: Joi.string().max(255).optional(),
  date_depot: Joi.date().required(),
  date_validation: Joi.date().optional(),
  historique: Joi.string().max(20).optional(),
  id_Utilisateur: Joi.number().integer().required(),
  id_TypeDocument: Joi.number().integer().required(),
  id_StatutDocument: Joi.number().integer().required(),
});

module.exports = {
  utilisateurSchema,
  typeDocumentSchema,
  statutDocumentSchema,
  documentSchema,
};
