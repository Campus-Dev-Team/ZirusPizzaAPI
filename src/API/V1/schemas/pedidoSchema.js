import Joi from 'joi';

const createPedido = Joi.object({
  id_cliente: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID del cliente debe ser un número',
      'any.required': 'El ID del cliente es requerido'
    }),
  estado: Joi.string()
    .max(50)
    .default('pendiente')
    .messages({
      'string.max': 'El estado no puede exceder los 50 caracteres'
    }),
  total: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El total debe ser un número',
      'any.required': 'El total es requerido'
    }),
  notas: Joi.string()
    .allow(null)
    .optional()
});

const updatePedido = Joi.object({
  estado: Joi.string()
    .max(50)
    .messages({
      'string.max': 'El estado no puede exceder los 50 caracteres'
    }),
  total: Joi.number()
    .precision(2)
    .messages({
      'number.base': 'El total debe ser un número'
    }),
  notas: Joi.string()
    .allow(null)
    .optional()
}).min(1);

export {
  createPedido,
  updatePedido
};