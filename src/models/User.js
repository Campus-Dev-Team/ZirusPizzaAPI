import { prisma } from '../config/db.js';

/**
 * Obtiene todos los usuarios.
 */
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

/**
 * Obtiene un usuario por ID.
 */
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id }
  });
};

/**
 * Obtiene un usuario por email.
 */
export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email: email }
  });
};

/**
 * Crea un nuevo usuario.
 */
export const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
};

/**
 * Actualiza un usuario por ID.
 */
export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      ...data,
      updatedAt: new Date()
    }
  });
};

/**
 * Actualiza el último login de un usuario.
 */
export const updateUserLastLogin = async (id) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      ultimoLogin: new Date(),
      updatedAt: new Date()
    }
  });
};

/**
 * Elimina un usuario por ID.
 */
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: id }
  });
};

/**
 * Cambia el estado de un usuario (activo/inactivo).
 */
export const toggleUserStatus = async (id, estado) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      estado: estado,
      updatedAt: new Date()
    }
  });
};