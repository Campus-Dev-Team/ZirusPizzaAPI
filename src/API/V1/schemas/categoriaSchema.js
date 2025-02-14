import Joi from 'joi';

const createCategoria = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre de la categoría es requerido',
      'string.min': 'El nombre de la categoría debe tener al menos 3 caracteres',
      'string.max': 'El nombre de la categoría no puede exceder los 100 caracteres'
    }),
  descripcion: Joi.string()
    .allow(null)
    .optional()
});

const updateCategoria = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'El nombre de la categoría debe tener al menos 3 caracteres',
      'string.max': 'El nombre de la categoría no puede exceder los 100 caracteres'
    }),
  descripcion: Joi.string()
    .allow(null)
    .optional()
}).min(1);

export {
  createCategoria,
  updateCategoria
};