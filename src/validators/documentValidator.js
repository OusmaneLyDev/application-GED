import { body } from 'express-validator';

export const documentValidator = [
  body('titre')
    .isString().withMessage('Le titre doit être une chaîne.')
    .notEmpty().withMessage('Le titre est requis.')
    .isLength({ max: 100 }).withMessage('Le titre ne peut pas dépasser 100 caractères.'),

  body('description')
    .optional()
    .isString().withMessage('La description doit être une chaîne.'),

  body('date_depot')
    .isISO8601().withMessage('La date de dépôt doit être une date valide.')
    .notEmpty().withMessage('La date de dépôt est requise.'),

  body('date_validation')
    .optional()
    .isISO8601().withMessage('La date de validation doit être une date valide.'),

  body('fichier')
    .optional()
    .isString().withMessage('Le fichier doit être une chaîne.')
    .isLength({ max: 255 }).withMessage('Le chemin du fichier ne peut pas dépasser 255 caractères.'),

  body('id_Utilisateur')
    .optional()
    .isInt().withMessage('L\'ID de l\'utilisateur doit être un entier.'),

  body('id_TypeDocument')
    .isInt().withMessage('L\'ID du type de document est requis et doit être un entier.'),

  body('id_StatutDocument')
    .isInt().withMessage('L\'ID du statut de document est requis et doit être un entier.'),
];
