import { body } from 'express-validator';

export const statutDocumentValidator = [
  body('nom')
    .isString().withMessage('Le nom doit être une chaîne.')
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ max: 20 }).withMessage('Le nom ne peut pas dépasser 20 caractères.'),

  body('description')
    .optional()
    .isString().withMessage('La description doit être une chaîne.'),
];
