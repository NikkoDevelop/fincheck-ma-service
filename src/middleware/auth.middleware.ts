import { FastifyReply, FastifyRequest } from 'fastify';

import { ErrorReplyData } from '../types';
import { verifyAccessToken } from '../utils/jwt';

export const AuthMiddleware = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: FastifyRequest<{ Body: any, Params: any, Querystring: any, Headers: any }>,
  reply: FastifyReply
) => {
  if (!req.headers.authorization) {
    reply
      .status(ErrorReplyData.NOT_AUTH.status)
      .send({
        message: ErrorReplyData.NOT_AUTH.message
      });

    return;
  }

  const parsedToken = await verifyAccessToken(req.headers.authorization);

  if (typeof parsedToken === 'string') {
    reply
      .status(ErrorReplyData.TOKEN_VALID_ERROR.status)
      .send({
        message: ErrorReplyData.TOKEN_VALID_ERROR.message
      });

    return;
  }

  req.headers.role = parsedToken.role;

  req.headers.userId = parsedToken.userId;
};
