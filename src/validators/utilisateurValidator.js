import { body } from 'express-validator';

export const utilisateurValidator = [
    body('nom')
    .isString().withMessage('Le nom doit être une chaîne.')
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ max: 100 }).withMessage('Le nom ne peut pas dépasser 100 caractères.')
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/).withMessage('Le nom ne doit contenir que des lettres, espaces ou tirets.'),
  

  body('email')
    .isEmail().withMessage('L\'email doit être valide.')
    .isLength({ max: 100 }).withMessage('L\'email ne peut pas dépasser 100 caractères.'),

  // body('mot_de_passe')
  //   .isString().withMessage('Le mot de passe doit être une chaîne.')
  //   .isLength({ min: 8, max: 100 }).withMessage('Le mot de passe doit contenir entre 8 et 100 caractères.'),

  body('role')
    .isString().withMessage('Le rôle doit être une chaîne.')
    .isIn(['Administrateur', 'Gestionnaire RH']).withMessage('Le rôle doit être "Administrateur" ou "Gestionnaire RH".'),
];
