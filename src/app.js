import express from 'express';
import { swaggerDocs } from './config/swagger.js';
import routes from './API/V1/routes/index.js';
import { versionControl } from './middlewares/versionControl.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', versionControl);

// Rutas
app.use('/api/v1', routes);

// Manejador de rutas no encontradas
app.use(notFoundHandler);

// Manejador de errores
app.use(errorHandler);

// Inicializar Swagger
swaggerDocs(app, port);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});