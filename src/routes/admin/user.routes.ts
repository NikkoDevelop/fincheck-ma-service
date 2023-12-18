import { FastifyInstance } from 'fastify';
import { AdminMiddleware } from 'src/middleware/admin.middleware';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

import UserController from '../../controllers/user';

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
