"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetup = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
    apis: ['./src/routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
const swaggerSetup = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.swaggerSetup = swaggerSetup;
