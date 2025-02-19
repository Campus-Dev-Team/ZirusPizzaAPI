import { prisma } from '../config/db.js';

/**
 * Obtiene todos los productos.
 */
export const getAllProductos = async () => {
  return await prisma.producto.findMany();
};

/**
 * Obtiene un producto por ID.
 */
export const getProductoById = async (id) => {
  return await prisma.producto.findUnique({
    where: { id_producto: Number(id) },
  });
};

/**
 * Crea un nuevo producto.
 */
export const createProducto = async (data) => {
  return await prisma.producto.create({
    data,
  });
};

/**
 * Actualiza un producto por ID.
 */
export const updateProducto = async (id, data) => {
  return await prisma.producto.update({
    where: { id_producto: Number(id) },
    data,
  });
};

/**
 * Elimina un producto por ID.
 */
export const deleteProducto = async (id) => {
  return await prisma.producto.delete({
    where: { id_producto: Number(id) },
  });
};