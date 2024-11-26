// index.js

import { documentSchema } from './documentValidator.js';
import { utilisateurSchema } from './utilisateurValidator.js';  
import { typeDocumentSchema } from './typeDocumentValidator.js';
import { statutDocumentSchema } from './statutDocumentValidator.js';

export {
  utilisateurSchema,  // Corrected here
  typeDocumentSchema,
  statutDocumentSchema,
  documentSchema,
};
