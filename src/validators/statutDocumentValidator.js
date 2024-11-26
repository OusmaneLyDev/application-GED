// statutDocumentValidator.js
import Joi from 'joi';

const statutDocumentSchema = Joi.object({
  nom: Joi.string()
    .max(20)
    .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .required()
    .messages({
      'string.base': 'Le nom doit être une chaîne',
      'string.empty': 'Le nom ne peut pas être vide',
      'string.max': 'Le nom ne peut pas dépasser 20 caractères',
      'string.pattern.base': 'Le nom ne peut pas contenir de chiffres ou de caractères spéciaux',
      'any.required': 'Le nom est requis',
    }),
  description: Joi.string().max(255).optional(),
  id_Utilisateur: Joi.number().integer().required().messages({
    'number.base': 'L\'ID de l\'utilisateur doit être un entier',
    'any.required': 'L\'ID de l\'utilisateur est requis',
  }),
});

// Exportation correcte du schéma
export { statutDocumentSchema };
