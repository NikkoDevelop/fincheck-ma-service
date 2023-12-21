import { FastifyInstance } from 'fastify';

import BankAccountController from '../controllers/bankAccount';
import { AuthMiddleware } from '../middleware/auth.middleware';

export const bankAccountRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.post('/', { preHandler: [AuthMiddleware] },
    BankAccountController.CreateBankAccountController);

  fastify.get('/:bankAccountId', { preHandler: [AuthMiddleware] },
    BankAccountController.GetBankAccountController);

  fastify.patch('/:bankAccountId', { preHandler: [AuthMiddleware] },
    BankAccountController.UpdateBankAccountController);

  fastify.delete('/:bankAccountId', { preHandler: [AuthMiddleware] },
    BankAccountController.DeleteBankAccountController);

  fastify.get('/accounts', { preHandler: [AuthMiddleware] },
    BankAccountController.GetMyBankAccountsController);

  fastify.get('/statistic', { preHandler: [AuthMiddleware] },
    BankAccountController.GetBankAccountsStatisticController);

  next();
};
