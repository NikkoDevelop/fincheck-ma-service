import { FastifyInstance } from 'fastify';

import CategoryController from '../controllers/category';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const categoryBaseRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.get('/:type', { preHandler: [AuthMiddleware] },
    CategoryController.GetCategoriesController);

  next();
};
