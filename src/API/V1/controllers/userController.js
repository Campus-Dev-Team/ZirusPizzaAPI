import { prisma } from '../../../config/db.js';
import bcrypt from 'bcryptjs';


export const createUser = async (req, res) => {
    try {
      const { email, password, ...restData } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario con la contraseña encriptada
      const user = await prisma.user.create({
        data: {
          ...restData,
          email,
          password: hashedPassword
        }
      });
  
      // Omitir el password en la respuesta
      const { password: _, ...userWithoutPassword } = user;
  
      // Enviar respuesta
      return res.status(201).json({
        message: 'Usuario creado exitosamente',
        data: userWithoutPassword
      });
  
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.status(400).json({ 
        message: 'Error al crear el usuario',
        error: error.message 
      });
    }
};


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.params;
  
      // Buscar el usuario
      const user = await prisma.user.findUnique({
        where: { id }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar la contraseña actual
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Contraseña actual incorrecta' });
      }
  
      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualizar la contraseña
      await prisma.user.update({
        where: { id },
        data: {
          password: hashedPassword,
          updatedAt: new Date()
        }
      });
  
      res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};