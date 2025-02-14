import { ValidationError } from './errorHandler.js';

/**
 * Middleware para validar datos usando esquemas Joi
 * @param {Object} schema - Esquema Joi para validar
 */
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,    // Recolectar todos los errores, no solo el primero
      stripUnknown: true,   // Eliminar campos no definidos en el schema
      errors: {
        wrap: {
          label: ''         // No envolver los nombres de campos en comillas
        }
      }
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');

      throw new ValidationError(errorMessage);
    }

    // Reemplazar el body con los datos validados y transformados
    req.body = value;
    next();
  };
};

/**
 * Middleware para validar parámetros de consulta
 * @param {Object} schema - Esquema Joi para validar
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: ''
        }
      }
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');

      throw new ValidationError(errorMessage);
    }

    // Reemplazar query con los datos validados y transformados
    req.query = value;
    next();
  };
};

/**
 * Middleware para validar parámetros de ruta
 * @param {Object} schema - Esquema Joi para validar
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: ''
        }
      }
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');

      throw new ValidationError(errorMessage);
    }

    // Reemplazar params con los datos validados y transformados
    req.params = value;
    next();
  };
};

/**
 * Middleware para validar archivos subidos
 * @param {Object} options - Opciones de validación
 */
const validateFiles = (options = {}) => {
  const {
    maxFiles = 1,
    maxSize = 5 * 1024 * 1024, // 5MB por defecto
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    required = true
  } = options;

  return (req, res, next) => {
    if (!req.files) {
      if (required) {
        throw new ValidationError('No se ha enviado ningún archivo');
      }
      return next();
    }

    const files = Array.isArray(req.files) ? req.files : [req.files];

    if (files.length > maxFiles) {
      throw new ValidationError(`No se pueden subir más de ${maxFiles} archivos`);
    }

    for (const file of files) {
      // Validar tamaño
      if (file.size > maxSize) {
        throw new ValidationError(`El archivo ${file.originalname} excede el tamaño máximo permitido`);
      }

      // Validar tipo
      if (!allowedTypes.includes(file.mimetype)) {
        throw new ValidationError(`Tipo de archivo no permitido para ${file.originalname}`);
      }
    }

    next();
  };
};

export {
  validateSchema,
  validateQuery,
  validateParams,
  validateFiles
};