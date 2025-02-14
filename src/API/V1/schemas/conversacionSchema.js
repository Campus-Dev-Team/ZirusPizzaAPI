import Joi from 'joi';

const createConversacion = Joi.object({
  id_cliente: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID del cliente debe ser un número',
      'any.required': 'El ID del cliente es requerido'
    }),
  estado: Joi.string()
    .max(50)
    .default('activa')
    .messages({
      'string.max': 'El estado no puede exceder los 50 caracteres'
    })
});

const updateConversacion = Joi.object({
  estado: Joi.string()
    .max(50)
    .messages({
      'string.max': 'El estado no puede exceder los 50 caracteres'
    })
}).min(1);

export {
  createConversacion,
  updateConversacion
};