import { FastifyInstance } from 'fastify';

import CategoryController from '../../controllers/category';
import { AdminMiddleware } from '../../middleware/admin.middleware';
import { AuthMiddleware } from '../../middleware/auth.middleware';

export const categoryRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.post('/', { preHandler: [AuthMiddleware, AdminMiddleware] },
    CategoryController.AdCreateCategoryController);

  fastify.get('/:type/:categoryId', { preHandler: [AuthMiddleware, AdminMiddleware] },
    CategoryController.AdGetCategoryController);

  fastify.patch('/:type/:categoryId', { preHandler: [AuthMiddleware, AdminMiddleware] },
    CategoryController.AdUpdateCategoryController);

  fastify.delete('/:type/:categoryId', { preHandler: [AuthMiddleware, AdminMiddleware] },
    CategoryController.AdDeleteCategoryController);

  next();
};
