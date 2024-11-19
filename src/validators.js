const Joi = require('joi');

// Validation pour le modèle Utilisateur
const utilisateurSchema = Joi.object({
  nom: Joi.string().max(50).required().messages({
    'string.base': 'Le nom doit être une chaîne',
    'string.empty': 'Le nom ne peut pas être vide',
    'string.max': 'Le nom ne peut pas dépasser 50 caractères',
    'any.required': 'Le nom est requis'
  }),
  email: Joi.string().email({ 
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'fr'] }
  }).max(50).required().messages({
    'string.base': 'L\'email doit être une chaîne',
    'string.email': 'L\'email doit être valide',
    'string.empty': 'L\'email ne peut pas être vide',
    'string.max': 'L\'email ne peut pas dépasser 50 caractères',
    'any.required': 'L\'email est requis'
  }),
  mot_de_passe: Joi.string().min(8).max(50).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,50}$')).required().messages({
    'string.base': 'Le mot de passe doit être une chaîne',
    'string.empty': 'Le mot de passe ne peut pas être vide',
    'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
    'string.max': 'Le mot de passe ne peut pas dépasser 50 caractères',
    'string.pattern.base': 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    'any.required': 'Le mot de passe est requis'
  }),
  role: Joi.string().max(50).required().messages({
    'string.base': 'Le rôle doit être une chaîne',
    'string.empty': 'Le rôle ne peut pas être vide',
    'string.max': 'Le rôle ne peut pas dépasser 50 caractères',
    'any.required': 'Le rôle est requis'
  }),
  date_creation: Joi.date().default(() => new Date(), 'date de création').optional() // Utilisez une fonction pour la valeur par défaut
});

// Validation pour le modèle TypeDocument
const typeDocumentSchema = Joi.object({
  nom: Joi.string().max(50).required().messages({
    'string.base': 'Le nom doit être une chaîne',
    'string.empty': 'Le nom ne peut pas être vide',
    'string.max': 'Le nom ne peut pas dépasser 50 caractères',
    'any.required': 'Le nom est requis'
  }),
  description: Joi.string().max(255).optional(),
  id_Utilisateur: Joi.number().integer().required().messages({
    'number.base': 'L\'ID de l\'utilisateur doit être un entier',
    'any.required': 'L\'ID de l\'utilisateur est requis'
  }),
});

// Validation pour le modèle StatutDocument
const statutDocumentSchema = Joi.object({
  nom: Joi.string().max(20).required().messages({
    'string.base': 'Le nom doit être une chaîne',
    'string.empty': 'Le nom ne peut pas être vide',
    'string.max': 'Le nom ne peut pas dépasser 20 caractères',
    'any.required': 'Le nom est requis'
  }),
  description: Joi.string().max(255).optional(),
  id_Utilisateur: Joi.number().integer().required().messages({
    'number.base': 'L\'ID de l\'utilisateur doit être un entier',
    'any.required': 'L\'ID de l\'utilisateur est requis'
  }),
});

const Joi = require('joi');

const documentSchema = Joi.object({
  titre: Joi.string().max(100).required().messages({
    'string.base': 'Le titre doit être une chaîne de caractères.',
    'string.empty': 'Le titre ne peut pas être vide.',
    'string.max': 'Le titre ne peut pas dépasser 100 caractères.',
    'any.required': 'Le titre est requis.',
  }),
  description: Joi.string().max(255).optional().messages({
    'string.base': 'La description doit être une chaîne de caractères.',
    'string.max': 'La description ne peut pas dépasser 255 caractères.',
  }),
  date_depot: Joi.date().required().messages({
    'date.base': 'La date de dépôt doit être une date valide.',
    'any.required': 'La date de dépôt est requise.',
  }),
  date_validation: Joi.date()
    .optional()
    .greater(Joi.ref('date_depot'))
    .messages({
      'date.base': 'La date de validation doit être une date valide.',
      'date.greater': 'La date de validation doit être postérieure à la date de dépôt.',
    }),
  historique: Joi.string().max(20).optional().messages({
    'string.base': 'L\'historique doit être une chaîne de caractères.',
    'string.max': 'L\'historique ne peut pas dépasser 20 caractères.',
  }),
  id_Utilisateur: Joi.number().integer().required().messages({
    'number.base': 'L\'ID de l\'utilisateur doit être un entier.',
    'any.required': 'L\'ID de l\'utilisateur est requis.',
  }),
  id_TypeDocument: Joi.number().integer().required().messages({
    'number.base': 'L\'ID du type de document doit être un entier.',
    'any.required': 'L\'ID du type de document est requis.',
  }),
  id_StatutDocument: Joi.number().integer().required().messages({
    'number.base': 'L\'ID du statut de document doit être un entier.',
    'any.required': 'L\'ID du statut de document est requis.',
  }),
});

module.exports = {
  documentSchema,
};
