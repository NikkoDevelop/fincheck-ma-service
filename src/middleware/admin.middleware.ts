import { UserRoleEnum } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ErrorReplyData } from '../types';

export const AdminMiddleware = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: FastifyRequest<{ Body: any, Params: any, Querystring: any, Headers: any }>,
  reply: FastifyReply,
  next: () => void
) => {
  if (!req.headers.role) {
    reply
      .status(ErrorReplyData.ACCESS_DENIED.status)
      .send({
        message: ErrorReplyData.ACCESS_DENIED.message
      });
  }

  if (req.headers.role !== UserRoleEnum.admin) {
    reply
      .status(ErrorReplyData.ACCESS_DENIED.status)
      .send({
        message: ErrorReplyData.ACCESS_DENIED.message
      });

    return;
  }

  next();
};
