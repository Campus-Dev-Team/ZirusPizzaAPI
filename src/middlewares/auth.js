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
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthorizationError('No se proporcionó token de autenticación');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica si es un token de API (no verifica expiración)
    if (decoded.role === 'api') {
      req.user = decoded;
      return next();
    }

    // Para tokens normales, verifica expiración
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new AuthorizationError('Token expirado');
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(new AuthorizationError('Token inválido'));
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