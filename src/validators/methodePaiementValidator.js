import { body, validationResult } from 'express-validator';

export const validateMethodePaiement = [
  body('nom')
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères.'),
];

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
