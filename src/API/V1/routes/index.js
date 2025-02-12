import express from 'express';
import clienteRoutes from './clienteRoutes.js';

const router = express.Router();

// Rutas de clientes
router.use('/clientes', clienteRoutes);

export default router;