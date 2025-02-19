import { UserModel } from '../../../models/User.js';
import bcrypt from 'bcryptjs';

/**
 * Crea un nuevo usuario.
 */
export const createUser = async (req, res) => {
    try {
        const existingUser = await UserModel.findUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const user = await UserModel.createUser(req.body);
        const { password: _, ...userWithoutPassword } = user;
        return res.status(201).json({ message: 'Usuario creado exitosamente', data: userWithoutPassword });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

/**
 * Obtiene todos los usuarios.
 */
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers({ select: { id: true, email: true, nombre: true, role: true, createdAt: true, estado: true, ultimoLogin: true, updatedAt: true } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

/**
 * Obtiene un usuario por ID.
 */
export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};

/**
 * Actualiza un usuario.
 */
export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

/**
 * Elimina un usuario.
 */
export const deleteUser = async (req, res) => {
    try {
        await UserModel.deleteUser(req.params.id);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};

/**
 * Cambia la contraseña de un usuario.
 */
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { id } = req.params;

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres' });
        }

        const user = await UserModel.getUserPasswordById(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Contraseña actual incorrecta' });

        await UserModel.changePassword(id, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar contraseña', error: error.message });
    }
};
