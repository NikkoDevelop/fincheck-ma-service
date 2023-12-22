import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';

import { COOKIE_SECRET, SERVER_HOST, SERVER_PORT } from './config';
import { whitelistCORS } from './configuration';
import { logger } from './log';
import { categoryRouter } from './routes/admin/category.routes';
import { userRouter } from './routes/admin/user.routes';
import { authRouter } from './routes/auth.routes';
import { bankAccountRouter } from './routes/bankAccount.routes';
import { categoryBaseRouter } from './routes/category.routes';
import { fileRouter } from './routes/file.router';
import { transactionRouter } from './routes/transaction.routes';

const server = fastify();

export const startServer = async () => {
  try {
    await server.register(cookie, {
      parseOptions: {},
      secret: COOKIE_SECRET
    });

    await server.register(cors, {
      origin: (origin, callback) => {
        if (origin === undefined) {
          logger.warn('Undefined request origin...');
          callback(null, false);
        } else if (whitelistCORS.includes(origin)) {
          logger.info('Successes request origin...');
          callback(null, true);
        } else {
          logger.warn('Invalid request origin...');
          callback(null, false);
        }
      }
    });

    /* ================== AUTH ROUTES ======================= */

    await server.register(authRouter, {
      prefix: '/api/auth'
    });

    /* ================== ADMIN ROUTES ====================== */

    await server.register(userRouter, {
      prefix: '/api/admin/user'
    });

    await server.register(categoryRouter, {
      prefix: '/api/admin/category'
    });

    /* ================= RESIDENT ROUTES ==================== */

    await server.register(fileRouter, {
      prefix: '/api/download'
    });

    await server.register(bankAccountRouter, {
      prefix: '/api/bank'
    });

    await server.register(transactionRouter, {
      prefix: '/api/transaction'
    });

    await server.register(categoryBaseRouter, {
      prefix: '/api/category'
    });

    await server.ready().then(() => {
      logger.info('Successfully fastify server!');
    }, (error) => {
      error instanceof Error &&
        logger.error(error.message);
    });

    await server.ready();

    server.listen({
      host: SERVER_HOST,
      port: Number(SERVER_PORT)
    }, (error) => {
      error === null ? logger.info(`Server started at http://${SERVER_HOST}:${SERVER_PORT}`) : logger.error(error.stack);
    });
  } catch (error) {
    error instanceof Error &&
      logger.error(error.message);
  }
};
