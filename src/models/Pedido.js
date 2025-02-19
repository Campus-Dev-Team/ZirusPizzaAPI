import { prisma } from '../config/db.js';

/**
 * Obtiene todos los pedidos.
 */
export const getAllPedidos = async () => {
  return await prisma.pedido.findMany({
    include: {
      cliente: true, // Incluye la relación con cliente
      detallePedido: true // Incluye los detalles del pedido
    },
  });
};

/**
 * Obtiene un pedido por ID.
 */
export const getPedidoById = async (id) => {
  return await prisma.pedido.findUnique({
    where: { id_pedido: Number(id) },
    include: {
      cliente: true, // Incluye la relación con cliente
      detallePedido: true // Incluye los detalles del pedido
    },
  });
};

/**
 * Crea un nuevo pedido.
 */
export const createPedido = async (data) => {
  return await prisma.pedido.create({
    data,
  });
};

/**
 * Actualiza un pedido por ID.
 */
export const updatePedido = async (id, data) => {
  return await prisma.pedido.update({
    where: { id_pedido: Number(id) },
    data,
  });
};

/**
 * Elimina un pedido por ID.
 */
export const deletePedido = async (id) => {
  return await prisma.pedido.delete({
    where: { id_pedido: Number(id) },
  });
};