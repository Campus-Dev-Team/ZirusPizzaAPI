import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../../../models/Cliente.js';

/**
 * Obtiene todos los clientes.
 */
export const getClientes = async (req, res) => {
  try {
    const clientes = await getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtiene un cliente por ID.
 */
export const getCliente = async (req, res) => {
  try {
    const cliente = await getClienteById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Crea un nuevo cliente.
 */
export const addCliente = async (req, res) => {
  try {
    const nuevoCliente = await createCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Actualiza un cliente por ID.
 */
export const editCliente = async (req, res) => {
  try {
    const clienteActualizado = await updateCliente(req.params.id, req.body);
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Elimina un cliente por ID.
 */
export const removeCliente = async (req, res) => {
  try {
    await deleteCliente(req.params.id);
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
