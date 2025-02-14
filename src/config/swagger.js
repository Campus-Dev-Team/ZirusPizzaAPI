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
      },
      {
        url: 'http://172.16.104.13:3000/api/v1',
        description: 'Servidor en red local'
      }
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          required: ['nombre', 'id_ciudad', 'telefono'],
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
        },
        User: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID del usuario',
              readOnly: true
            },
            nombre: {
              type: 'string',
              description: 'Nombre del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario',
              writeOnly: true
            },
            role: {
              type: 'string',
              enum: ['admin', 'manager', 'user'],
              default: 'user',
              description: 'Rol del usuario'
            },
            estado: {
              type: 'boolean',
              default: true,
              description: 'Estado del usuario'
            },
            ultimoLogin: {
              type: 'string',
              format: 'date-time',
              description: 'Última fecha de inicio de sesión',
              nullable: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              readOnly: true
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              readOnly: true
            }
          }
        },
        ChangePassword: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: {
              type: 'string',
              format: 'password',
              description: 'Contraseña actual'
            },
            newPassword: {
              type: 'string',
              format: 'password',
              description: 'Nueva contraseña'
            }
          }
        },
        LoginCredentials: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
              description: 'Email del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123',
              description: 'Contraseña del usuario'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success'
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'JWT Token'
                },
                user: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string',
              example: 'Descripción del error'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success'
            },
            data: {
              type: 'object'
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