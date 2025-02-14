import Joi from 'joi';

const create = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre no puede exceder los 100 caracteres'
    }),
    
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Debe proporcionar un email válido'
    }),
    
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.empty': 'La contraseña es requerida',
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.max': 'La contraseña no puede exceder los 30 caracteres'
    }),
    
  role: Joi.string()
    .valid('admin', 'manager', 'user')
    .default('user')
    .messages({
      'any.only': 'Rol no válido'
    })
});

const update = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre no puede exceder los 100 caracteres'
    }),
    
  email: Joi.string()
    .email()
    .messages({
      'string.email': 'Debe proporcionar un email válido'
    }),
    
  role: Joi.string()
    .valid('admin', 'manager', 'user')
    .messages({
      'any.only': 'Rol no válido'
    }),
    
  estado: Joi.boolean()
}).min(1);

const changePassword = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'La contraseña actual es requerida'
    }),
    
  newPassword: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.empty': 'La nueva contraseña es requerida',
      'string.min': 'La nueva contraseña debe tener al menos 6 caracteres',
      'string.max': 'La nueva contraseña no puede exceder los 30 caracteres'
    })
});

export {
  create,
  update,
  changePassword
};