import Joi from 'joi';

const create = Joi.object({
 nombre: Joi.string()
   .min(3)
   .max(100)
   .required()
   .messages({
     'string.empty': 'El nombre de la ciudad es requerido',
     'string.min': 'El nombre de la ciudad debe tener al menos 3 caracteres',
     'string.max': 'El nombre de la ciudad no puede exceder los 100 caracteres'
   }),
 id_departamento: Joi.number()
   .integer()
   .required()
   .messages({
     'number.base': 'El id del departamento debe ser un número',
     'number.integer': 'El id del departamento debe ser un número entero',
     'any.required': 'El id del departamento es requerido'
   })
});

const update = Joi.object({
 nombre: Joi.string()
   .min(3)
   .max(100)
   .messages({
     'string.min': 'El nombre de la ciudad debe tener al menos 3 caracteres',
     'string.max': 'El nombre de la ciudad no puede exceder los 100 caracteres'
   }),
 id_departamento: Joi.number()
   .integer()
   .messages({
     'number.base': 'El id del departamento debe ser un número',
     'number.integer': 'El id del departamento debe ser un número entero'
   })
}).min(1);

export {
 create,
 update
};