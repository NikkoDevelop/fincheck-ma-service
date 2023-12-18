import { FastifyInstance } from 'fastify';

import AuthController from '../controllers/auth';

export const authRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.post('/signup', AuthController.SignUpUserController);

  fastify.post('/signin', AuthController.SignInUserController);

  fastify.get('/refresh', AuthController.RefreshTokenController);

  next();
};
