import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from 'src/log';

import { ErrorReplyData } from '../../types';
import { ISignInUser, ISignUpUser } from './interface';
import { RefreshTokenService } from './service/RefreshToken.service';
import { SignInUserService } from './service/SignIn.service';
import { SignUpUserService } from './service/SignUp.service';
import { SignInSchema, SignUpSchema } from './validator';

export const SignUpUserController = async (req: FastifyRequest<{ Body: ISignUpUser }>, reply: FastifyReply) => {
  try {
    const data = SignUpSchema.parse(req.body);

    const { message, status, user } = await SignUpUserService(data);

    if (!user) {
      reply
        .status(status)
        .send({
          data: {
            message
          }
        });
      return;
    }

    reply
      .status(status)
      .send({
        data: {
          message,
          user
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`SignUpController - ${error.message}`);

    reply
      .status(ErrorReplyData.AUTHENTICATION_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.AUTHENTICATION_ERROR.message
        }
      });
  }
};

export const SignInUserController = async (req: FastifyRequest<{ Body: ISignInUser }>, reply: FastifyReply) => {
  try {
    const data = SignInSchema.parse(req.body);

    const { message, status, user, token, refreshToken } = await SignInUserService(data);

    if (user && token && refreshToken) {
      reply
        .status(status)
        .cookie('refreshToken', `Bearer ${refreshToken}`,
          {
            httpOnly: true,
            maxAge: 60 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
          }
        )
        .send({
          data: {
            message,
            token,
            user
          }
        });

      return;
    }

    reply
      .status(status)
      .send({
        data: {
          message
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`SignInController - ${error.message}`);

    reply
      .status(ErrorReplyData.AUTHENTICATION_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.AUTHENTICATION_ERROR.message
        }
      });
  }
};

export const RefreshTokenController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!req.cookies.refreshToken) {
      reply
        .status(ErrorReplyData.TOKEN_VALID_ERROR.status)
        .send({
          data: {
            message: ErrorReplyData.TOKEN_VALID_ERROR.message
          }
        });

      return;
    }

    const { message, status, user, token, refreshToken } = await RefreshTokenService(req.cookies.refreshToken);

    if (user && token && refreshToken) {
      reply
        .status(status)
        .cookie('refreshToken', `Bearer ${refreshToken}`,
          {
            httpOnly: true,
            maxAge: 60 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
          }
        )
        .send({
          data: {
            message,
            token,
            user
          }
        });

      return;
    }

    reply
      .status(status)
      .send({
        data: {
          message
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`RefreshTokenController - ${error.message}`);

    reply
      .status(ErrorReplyData.AUTHENTICATION_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.AUTHENTICATION_ERROR.message
        }
      });
  }
};

const AuthController = { SignUpUserController, SignInUserController, RefreshTokenController };

export default AuthController;
