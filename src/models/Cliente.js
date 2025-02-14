import { prisma } from '../config/db.js';

/**
 * Obtiene todos los clientes con su ciudad asociada.
 */
export const getAllClientes = async () => {
  return await prisma.cliente.findMany({
    include: {
      ciudad: true, // Trae la ciudad relacionada
    },
  });
};

/**
 * Obtiene un cliente por ID.
 */
export const getClienteById = async (id) => {
  return await prisma.cliente.findUnique({
    where: { id_cliente: Number(id) },
    include: {
      ciudad: true, // Incluye la relación con ciudad
    },
  });
};

/**
 * Crea un nuevo cliente.
 */
export const createCliente = async (data) => {
  return await prisma.cliente.create({
    data,
    fecha_registro: new Date()
  });
};

/**
 * Actualiza un cliente por ID.
 */
export const updateCliente = async (id, data) => {
  return await prisma.cliente.update({
    where: { id_cliente: Number(id) },
    data,
  });
};

/**
 * Elimina un cliente por ID.
 */
export const deleteCliente = async (id) => {
  return await prisma.cliente.delete({
    where: { id_cliente: Number(id) },
  });
};
