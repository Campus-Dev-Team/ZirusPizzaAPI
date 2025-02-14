import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

/**
 * Middleware para verificar el token JWT
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
export const authenticate = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        error: {
          code: 'UNAUTHORIZED',
          message: 'No se proporcionó token de acceso'
        }
      });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 'fail',
          error: {
            code: 'FORBIDDEN',
            message: 'Token inválido o expirado'
          }
        });
      }

      // Agregar la información decodificada a la solicitud
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: {
        code: 'SERVER_ERROR',
        message: 'Error al verificar el token'
      }
    });
  }
};

/**
 * Función para generar un token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {string} Token JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ||'1h' // Token expira en 1 hora
  });
};

/**
 * Middleware para verificar roles
 * @param {string[]} allowedRoles - Array de roles permitidos
 */
export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'fail',
        error: {
          code: 'UNAUTHORIZED',
          message: 'Usuario no autenticado'
        }
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        error: {
          code: 'FORBIDDEN',
          message: 'No tiene permisos para acceder a este recurso'
        }
      });
    }

    next();
  };
};