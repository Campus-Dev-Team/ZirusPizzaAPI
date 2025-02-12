import { prisma } from '../../../config/db.js'; 

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  try {
    const cliente = await prisma.cliente.create({
      data: req.body
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un cliente por ID
export const updateCliente = async (req, res) => {
  try {
    const cliente = await prisma.cliente.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un cliente por ID
export const deleteCliente = async (req, res) => {
  try {
    const cliente = await prisma.cliente.delete({
      where: { id: parseInt(req.params.id) }
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};