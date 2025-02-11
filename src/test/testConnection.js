import { prisma } from '../config/db.js'; // Asegúrate de importar tu instancia de Prisma

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

testConnection();
