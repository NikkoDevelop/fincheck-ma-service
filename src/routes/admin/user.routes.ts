import { FastifyInstance } from 'fastify';

import UserController from '../../controllers/user';
import { AdminMiddleware } from '../../middleware/admin.middleware';
import { AuthMiddleware } from '../../middleware/auth.middleware';

export const userRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.post('/', { preHandler: [AuthMiddleware, AdminMiddleware] },
    UserController.CreateUserController);

  fastify.get('/:id', { preHandler: [AuthMiddleware, AdminMiddleware] },
    UserController.GetUserController);

  fastify.patch('/:id', { preHandler: [AuthMiddleware, AdminMiddleware] },
    UserController.UpdateUserController);

  fastify.delete('/:id', { preHandler: [AuthMiddleware, AdminMiddleware] },
    UserController.DeleteUserController);

  next();
};
