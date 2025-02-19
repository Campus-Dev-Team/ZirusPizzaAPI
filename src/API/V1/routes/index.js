import express from 'express';
import clienteRoutes from './clienteRoutes.js';
import userRoutes from './userRoutes.js';
import authRoutes from './loginRoute.js';
import productoRoutes from './productoRoutes.js';
import { authenticate } from '../../../middlewares/auth.js';

const router = express.Router();

// Rutas públicas
router.use('/auth', authRoutes);

// Rutas protegidas
router.use('/clientes', authenticate, clienteRoutes);
router.use('/users', authenticate, userRoutes);
router.use('/productos', authenticate, productoRoutes);

export default router;