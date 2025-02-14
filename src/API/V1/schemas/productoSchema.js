import Joi from 'joi';

const createProducto = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre del producto es requerido',
      'string.min': 'El nombre del producto debe tener al menos 3 caracteres',
      'string.max': 'El nombre del producto no puede exceder los 100 caracteres'
    }),
  descripcion: Joi.string()
    .allow(null)
    .optional(),
  precio: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El precio debe ser un número',
      'any.required': 'El precio es requerido'
    }),
  id_categoria: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID de la categoría debe ser un número',
      'any.required': 'El ID de la categoría es requerido'
    }),
  disponible: Joi.boolean()
    .default(true)
});

const updateProducto = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'El nombre del producto debe tener al menos 3 caracteres',
      'string.max': 'El nombre del producto no puede exceder los 100 caracteres'
    }),
  descripcion: Joi.string()
    .allow(null)
    .optional(),
  precio: Joi.number()
    .precision(2)
    .messages({
      'number.base': 'El precio debe ser un número'
    }),
  id_categoria: Joi.number()
    .integer()
    .messages({
      'number.base': 'El ID de la categoría debe ser un número'
    }),
  disponible: Joi.boolean()
}).min(1);

export {
  createProducto,
  updateProducto
};