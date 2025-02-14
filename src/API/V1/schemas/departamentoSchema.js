import Joi from 'joi';

const createDepartamento = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre del departamento es requerido',
      'string.min': 'El nombre del departamento debe tener al menos 3 caracteres',
      'string.max': 'El nombre del departamento no puede exceder los 100 caracteres'
    })
});

const updateDepartamento = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'El nombre del departamento debe tener al menos 3 caracteres',
      'string.max': 'El nombre del departamento no puede exceder los 100 caracteres'
    })
}).min(1);

export {
  createDepartamento,
  updateDepartamento
};