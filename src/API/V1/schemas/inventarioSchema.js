import Joi from 'joi';

const createInventario = Joi.object({
  id_producto: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID del producto debe ser un número',
      'any.required': 'El ID del producto es requerido'
    }),
  cantidad: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'La cantidad debe ser un número entero',
      'any.required': 'La cantidad es requerida'
    }),
  usuario_actualizacion: Joi.number()
    .integer()
    .allow(null)
    .optional(),
  tipo_movimiento: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.empty': 'El tipo de movimiento es requerido',
      'string.max': 'El tipo de movimiento no puede exceder los 50 caracteres'
    })
});

const updateInventario = Joi.object({
  cantidad: Joi.number()
    .integer()
    .messages({
      'number.base': 'La cantidad debe ser un número entero'
    }),
  usuario_actualizacion: Joi.number()
    .integer()
    .allow(null)
    .optional(),
  tipo_movimiento: Joi.string()
    .max(50)
    .messages({
      'string.max': 'El tipo de movimiento no puede exceder los 50 caracteres'
    })
}).min(1);

export {
  createInventario,
  updateInventario
}; 