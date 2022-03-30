import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const schema = {
  description: 'Life check',
  summary: 'Life check',
  tags: ['Utility'],
  response: {
    200: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
        date: {
          type: 'string',
        },
      },
    },
  },
};

const handler = (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    status: 'OK',
    date: new Date(),
  });
};

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/heartbeat',
    handler,
    schema,
  });
};
