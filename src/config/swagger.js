import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión',
      version: '1.0.0',
      description: 'Documentación de la API de gestión de clientes, pedidos, productos e inventario',
      contact: {
        name: 'CampusDev',
        email: 'wixi@campus.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          required: ['nombre', 'id_ciudad','telefono'],
          properties: {
            id_cliente: {
              type: 'integer',
              description: 'ID del cliente'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del cliente'
            },
            telefono: {
              type: 'string',
              description: 'Teléfono del cliente'
            },
            id_ciudad: {
              type: 'integer',
              description: 'ID de la ciudad del cliente'
            },
            detalle_direccion: {
              type: 'string',
              description: 'Detalle de la dirección del cliente'
            },
            fecha_registro: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de registro del cliente'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  // Paths to files containing OpenAPI definitions
  apis: [
    './src/API/V1/routes/*.js',
    './src/API/V1/schemas/*.js',
    './src/models/*.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  // Ruta para la documentación en JSON
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Ruta para la UI de Swagger
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`📝 Documentación de Swagger disponible en http://localhost:${port}/api/v1/docs`);
};

export { swaggerDocs };