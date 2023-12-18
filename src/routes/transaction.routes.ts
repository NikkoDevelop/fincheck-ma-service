import { FastifyInstance } from 'fastify';

import TransactionController from '../controllers/transaction';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const transactionRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.post('/', { preHandler: [AuthMiddleware] },
    TransactionController.CreateTransactionController);

  fastify.get('/:transactionId', { preHandler: [AuthMiddleware] },
    TransactionController.GetTransactionController);

  fastify.patch('/:transactionId', { preHandler: [AuthMiddleware] },
    TransactionController.UpdateTransactionController);

  fastify.delete('/:transactionId', { preHandler: [AuthMiddleware] },
    TransactionController.DeleteTransactionController);

  next();
};
