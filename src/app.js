import express from 'express';
import { swaggerDocs } from './config/swagger.js';
import routes from './API/V1/routes/index.js';
import { versionControl } from './middlewares/versionControl.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Configurar CORS para permitir acceso en la red local
const corsOptions = {
  origin: ['http://localhost:3000', 'http://172.16.104.13:3000'], // Ajusta la IP de tu máquina local
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', versionControl);

// Rutas
app.use('/api/v1', routes);

// Inicializar Swagger
swaggerDocs(app, port);

// Manejador de rutas no encontradas
app.use(notFoundHandler);

// Manejador de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});