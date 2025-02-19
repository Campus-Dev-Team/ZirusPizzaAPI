import { prisma } from '../config/db.js';

/**
 * Obtiene todos los inventarios.
 */
export const getAllInventarios = async () => {
  return await prisma.inventario.findMany();
};

/**
 * Obtiene un inventario por ID.
 */
export const getInventarioById = async (id) => {
  return await prisma.inventario.findUnique({
    where: { id_inventario: Number(id) },
  });
};

/**
 * Crea un nuevo inventario.
 */
export const createInventario = async (data) => {
  return await prisma.inventario.create({
    data,
  });
};

/**
 * Actualiza un inventario por ID.
 */
export const updateInventario = async (id, data) => {
  return await prisma.inventario.update({
    where: { id_inventario: Number(id) },
    data,
  });
};

/**
 * Elimina un inventario por ID.
 */
export const deleteInventario = async (id) => {
  return await prisma.inventario.delete({
    where: { id_inventario: Number(id) },
  });
};