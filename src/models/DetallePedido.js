import { prisma } from '../config/db.js';

/**
 * Obtiene todos los detalles de pedidos.
 */
export const getAllDetallePedidos = async () => {
  return await prisma.detallePedido.findMany({
    include: {
      producto: true, // Incluye la relación con producto
      pedido: true // Incluye la relación con pedido
    },
  });
};

/**
 * Obtiene un detalle de pedido por ID.
 */
export const getDetallePedidoById = async (id) => {
  return await prisma.detallePedido.findUnique({
    where: { id_detalle_pedido: Number(id) },
    include: {
      producto: true, // Incluye la relación con producto
      pedido: true // Incluye la relación con pedido
    },
  });
};

/**
 * Crea un nuevo detalle de pedido.
 */
export const createDetallePedido = async (data) => {
  return await prisma.detallePedido.create({
    data,
  });
};

/**
 * Actualiza un detalle de pedido por ID.
 */
export const updateDetallePedido = async (id, data) => {
  return await prisma.detallePedido.update({
    where: { id_detalle_pedido: Number(id) },
    data,
  });
};

/**
 * Elimina un detalle de pedido por ID.
 */
export const deleteDetallePedido = async (id) => {
  return await prisma.detallePedido.delete({
    where: { id_detalle_pedido: Number(id) },
  });
};