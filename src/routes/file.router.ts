import { FastifyInstance } from 'fastify';

import DownloadFileController from '../controllers/file';

export const fileRouter = (fastify: FastifyInstance, opts, next: (err?: Error) => void) => {
  fastify.get('/:filename',
    DownloadFileController.DownloadFileController);

  next();
};
