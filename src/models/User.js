import { prisma } from '../../src/config/db.js';
import bcrypt from 'bcryptjs';

export const UserModel = {
    async createUser(data) {
        const { email, password, ...restData } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                ...restData,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    },

    async findUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    },

    async getAllUsers() {
        return prisma.user.findMany({
            select: { id: true, email: true, nombre: true, role: true, createdAt: true }
        });
    },

    async getUserById(id) {
        return prisma.user.findUnique({
            where: { id },
            ...options
        });
    },

    async updateUser(id, data) {
        return prisma.user.update({
            where: { id },
            data: { ...data, updatedAt: new Date() }
        });
    },

    async deleteUser(id) {
        return prisma.user.delete({ where: { id } });
    },

    async changePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return prisma.user.update({
            where: { id },
            data: { password: hashedPassword, updatedAt: new Date() }
        });
    },

    async getUserPasswordById(id) {
      return prisma.user.findUnique({
          where: { id },
          select: { password: true }
      });
    }
  
};


