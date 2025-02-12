import express from 'express';
import { swaggerDocs } from './config/swagger.js';
import routes from './API/V1/routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/v1', routes);

// Inicializar Swagger
swaggerDocs(app, port);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});