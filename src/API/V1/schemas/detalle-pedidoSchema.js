import Joi from 'joi';

const createDetallePedido = Joi.object({
  id_pedido: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID del pedido debe ser un número',
      'any.required': 'El ID del pedido es requerido'
    }),
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
  precio_unitario: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El precio unitario debe ser un número',
      'any.required': 'El precio unitario es requerido'
    }),
  subtotal: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El subtotal debe ser un número',
      'any.required': 'El subtotal es requerido'
    })
});

export {
  createDetallePedido
};