import Joi from 'joi';

const utilisateurSchema = Joi.object({
  nom: Joi.string()
    .max(50)
    .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .required()
    .messages({
      'string.base': 'Le nom doit être une chaîne.',
      'string.empty': 'Le nom ne peut pas être vide.',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères.',
      'string.pattern.base': 'Le nom ne peut pas contenir de chiffres ou de caractères spéciaux.',
      'any.required': 'Le nom est requis.',
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'fr'] } })
    .max(50)
    .required()
    .messages({
      'string.base': 'L\'email doit être une chaîne.',
      'string.email': 'L\'email doit être valide.',
      'string.empty': 'L\'email ne peut pas être vide.',
      'string.max': 'L\'email ne peut pas dépasser 50 caractères.',
      'any.required': 'L\'email est requis.',
    }),
  mot_de_passe: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.base': 'Le mot de passe doit être une chaîne.',
      'string.empty': 'Le mot de passe ne peut pas être vide.',
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
      'string.max': 'Le mot de passe ne peut pas dépasser 50 caractères.',
      'string.pattern.base': 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.',
      'any.required': 'Le mot de passe est requis.',
    }),
  role: Joi.string()
    .valid('Administrateur', 'Gestionnaire RH')
    .required()
    .messages({
      'string.base': 'Le rôle doit être une chaîne.',
      'string.empty': 'Le rôle ne peut pas être vide.',
      'any.only': 'Le rôle doit être soit "Administrateur" soit "Gestionnaire RH".',
      'any.required': 'Le rôle est requis.',
    }),
  date_creation: Joi.date()
    .default(() => new Date())
    .optional(),
});

export { utilisateurSchema };
