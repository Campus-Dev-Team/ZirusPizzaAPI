/**
 * Clase base para errores de la API
 */
class APIError extends Error {
    constructor(message, statusCode, errorCode = null) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /**
   * Error para recursos no encontrados
   */
  class NotFoundError extends APIError {
    constructor(resource = 'Recurso') {
      super(`${resource} no encontrado`, 404, 'RESOURCE_NOT_FOUND');
    }
  }
  
  /**
   * Error de validación
   */
  class ValidationError extends APIError {
    constructor(message = 'Error de validación') {
      super(message, 400, 'VALIDATION_ERROR');
    }
  }
  
  /**
   * Error de autorización
   */
  class AuthorizationError extends APIError {
    constructor(message = 'No autorizado') {
      super(message, 401, 'UNAUTHORIZED');
    }
  }
  
  /**
   * Error de permisos
   */
  class ForbiddenError extends APIError {
    constructor(message = 'Acceso denegado') {
      super(message, 403, 'FORBIDDEN');
    }
  }
  
  /**
   * Error de conflicto (ej: duplicados)
   */
  class ConflictError extends APIError {
    constructor(message = 'Conflicto con el recurso existente') {
      super(message, 409, 'CONFLICT');
    }
  }
  
  /**
   * Middleware de manejo de errores
   */
  const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    // Si el error ya es una instancia de APIError, lo usamos directamente
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: {
          code: err.errorCode,
          message: err.message
        }
      });
    }
  
    // Manejar errores específicos de Express/Node
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: 'fail',
        error: {
          code: 'INVALID_ID',
          message: 'ID inválido'
        }
      });
    }
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'fail',
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Error de validación',
          details: Object.values(err.errors).map(val => val.message)
        }
      });
    }
  
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        status: 'fail',
        error: {
          code: 'DUPLICATE_KEY',
          message: `El valor del campo ${field} ya existe`
        }
      });
    }
  
    // En desarrollo, enviar el stack trace
    const isDevelopment = process.env.NODE_ENV === 'development';
  
    // Error por defecto (500 Internal Server Error)
    return res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: isDevelopment ? err.message : 'Error interno del servidor',
        ...(isDevelopment && { stack: err.stack })
      }
    });
  };
  
  // Middleware para manejar rutas no encontradas
  const notFoundHandler = (req, res, next) => {
    next(new NotFoundError('Ruta'));
  };
  
export {
    errorHandler,
    notFoundHandler,
    APIError,
    NotFoundError,
    ValidationError,
    AuthorizationError,
    ForbiddenError,
    ConflictError
};