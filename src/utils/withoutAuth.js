import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generatePermanentToken = () => {
  const payload = {
    id: 'api-client',
    role: 'api',
    email: 'api@system.local'
  };

  // Genera un token sin expiración
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET
  );

  console.log('Token permanente generado:');
  console.log(token);
};

generatePermanentToken();