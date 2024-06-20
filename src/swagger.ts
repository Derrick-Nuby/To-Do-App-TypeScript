import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'To Do App In TypeScript',
      version: '1.0.0',
      description: 'API Documentation using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local Server',
      },
      {
        url: 'https://ts-todo-app-k33v.onrender.com',
        description: 'Deployed Server',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const swaggerSetup = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
