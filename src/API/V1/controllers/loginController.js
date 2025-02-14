import { prisma } from '../../../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../middlewares/auth.js';
import { ValidationError, AuthorizationError } from '../../../middlewares/errorHandler.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionen las credenciales
    if (!email || !password) {
      throw new ValidationError('Email y contraseña son requeridos');
    }

    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthorizationError('Credenciales inválidas');
    }

    // Generar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Actualizar último login
    await prisma.user.update({
      where: { id: user.id },
      data: { ultimoLogin: new Date() }
    });

    // Enviar respuesta
    res.status(200).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};