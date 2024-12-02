import { body } from 'express-validator';

export const typeDocumentValidator = [
  body('nom')
  .isString().withMessage('Le nom doit être une chaîne.')
  .notEmpty().withMessage('Le nom est requis.')
  .isLength({ max: 50 }).withMessage('Le nom ne peut pas dépasser 50 caractères.')
  .matches(/^[a-zA-ZÀ-ÿ\s-]+$/).withMessage('Le nom ne doit contenir que des lettres, espaces ou tirets.'),

  body('description')
    .optional()
    .isString().withMessage('La description doit être une chaîne.'),
];
