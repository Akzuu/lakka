import * as path from 'path';

import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifyAutoLoad from 'fastify-autoload';
import { log } from '../../lib/log';

const APPLICATION_PORT = process.env.APPLICATION_PORT ?? 3000;
const ROUTE_PREFIX = process.env.ROUTE_PREFIX;
const SWAGGER_HOST = process.env.SWAGGER_HOST;

const initServer = async () => {
  const server = fastify({
    logger: false,
    ignoreTrailingSlash: true,
    ajv: {
      customOptions: {
        removeAdditional: 'all', // Remove additional params from the body etc
      },
    },
  });

  // Register plugins and routes
  server
    .addSchema({
      $id: 'error',
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    })
    .register(fastifySwagger, {
      routePrefix: `${ROUTE_PREFIX}/documentation`,
      swagger: {
        info: {
          title: 'Lakka',
          description: 'Kyykka stream UI generator',
          version: '1.0.0',
        },
        host: `${SWAGGER_HOST}:${APPLICATION_PORT}`,
        schemes: ['http', 'https'],
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          {
            name: 'Utility',
            description: 'Utility endpoints',
          },
        ],
      },
      exposeRoute: true,
    })
    // SEC_PRO: Helmet is a security middleware, which can help filtering out
    // unwanted requests. It will for example filter out common vulnerabilities
    .register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
      global: true,
    })
    // SEC_PRO: CORS is also used to manage where the server can be accessed
    .register(fastifyCors, {
      origin: (origin, cb) => {
        cb(null, true);
      },
    })
    .register(fastifyAutoLoad, {
      dir: path.join(__dirname, 'routes'),
      dirNameRoutePrefix: (folderParent, folderName) =>
        `${ROUTE_PREFIX}/${folderName}`,
    })
    .setErrorHandler((error, request, reply) => {
      log.error({
        error: error.name,
        message: error.message,
        url: request.url,
        method: request.method,
        body: request.body,
        stack: error.stack,
      });

      // SEC_PRO: As a security measure, we do not return the actual error msg
      // to the user. Instead, we just send a general 500 code and message
      reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Internal Server Error',
      });
    });

  return {
    start: async () => {
      await server.listen(APPLICATION_PORT, '0.0.0.0');
      return server;
    },
  };
};

export default initServer;
