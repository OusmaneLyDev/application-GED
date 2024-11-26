// validateMiddleware.js
const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: 'Validation des données échouée',
          errors: messages,
        });
      }
      next();
    };
  };
  
  export default validate;
  