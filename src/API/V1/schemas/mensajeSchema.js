import Joi from 'joi';

const createMensaje = Joi.object({
  id_conversacion: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El ID de la conversación debe ser un número',
      'any.required': 'El ID de la conversación es requerido'
    }),
  es_bot: Joi.boolean()
    .required()
    .messages({
      'any.required': 'Es necesario especificar si el mensaje es del bot'
    }),
  contenido: Joi.string()
    .required()
    .messages({
      'string.empty': 'El contenido del mensaje es requerido'
    }),
  intento: Joi.string()
    .max(100)
    .allow(null)
    .optional()
    .messages({
      'string.max': 'El intento no puede exceder los 100 caracteres'
    }),
  contexto: Joi.object()
    .allow(null)
    .optional()
});

export {
  createMensaje
};