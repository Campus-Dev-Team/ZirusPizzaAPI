import express from 'express';
import clienteRoutes from './clienteRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Rutas de clientes
router.use('/clientes', clienteRoutes);

// Rutas de usuarios
router.use('/users', userRoutes);

export default router;