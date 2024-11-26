// documentValidator.js

import Joi from 'joi';

const documentSchema = Joi.object({
  titre: Joi.string().max(100).required().messages({
    'string.base': 'Le titre doit être une chaîne de caractères.',
    'string.empty': 'Le titre ne peut pas être vide.',
    'string.max': 'Le titre ne peut pas dépasser 100 caractères.',
    'any.required': 'Le titre est requis.',
  }),
  // Ajoutez les autres validations...
});

export { documentSchema };
