import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from 'src/log';

import { ErrorReplyData } from '../../types';
import { IAdCreateUser, IAdDeleteUser, IAdGetUser, IAdUpdateUser } from './interface';
import { AdCreateUserService } from './service/AdCreateUser.service';
import { AdDeleteUserService } from './service/AdDeleteUser.service';
import { AdGetUserService } from './service/AdGetUser.service';
import { AdUpdateUserService } from './service/AdUpdateUser.service';
import { AdCreateUserSchema, AdDeleteUserSchema, AdGetUserSchema, AdUpdateUserSchema } from './validator';

export const CreateUserController = async (
  req: FastifyRequest<{ Body: IAdCreateUser }>,
  reply: FastifyReply
) => {
  try {
    const data = AdCreateUserSchema.parse(req.body);

    const { message, status, user } = await AdCreateUserService(data);

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
      logger.error(`CreateUserController - ${error.message}`);

    reply
      .status(ErrorReplyData.CREATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.CREATE_ERROR.message
        }
      });
  }
};

export const GetUserController = async (
  req: FastifyRequest<{ Params: IAdGetUser }>,
  reply: FastifyReply
) => {
  try {
    const data = AdGetUserSchema.parse(req.params);

    const { message, status, user } = await AdGetUserService(data);

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
      logger.error(`GetUserController - ${error.message}`);

    reply
      .status(ErrorReplyData.SEND_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.SEND_ERROR.message
        }
      });
  }
};

export const UpdateUserController = async (
  req: FastifyRequest<{ Params: Pick<IAdUpdateUser, 'userId'>, Body: Omit<IAdUpdateUser, 'userId'> }>,
  reply: FastifyReply
) => {
  try {
    const data = AdUpdateUserSchema.parse({ ...req.params, ...req.body });

    const { message, status, user } = await AdUpdateUserService(data);

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
      logger.error(`UpdateUserController - ${error.message}`);

    reply
      .status(ErrorReplyData.UPDATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.UPDATE_ERROR.message
        }
      });
  }
};

export const DeleteUserController = async (
  req: FastifyRequest<{ Params: IAdDeleteUser }>,
  reply: FastifyReply
) => {
  try {
    const data = AdDeleteUserSchema.parse(req.params);

    const { message, status } = await AdDeleteUserService(data);

    reply
      .status(status)
      .send({
        data: {
          message
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`DeleteUserController - ${error.message}`);

    reply
      .status(ErrorReplyData.DELETE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.DELETE_ERROR.message
        }
      });
  }
};

const UserController = { CreateUserController, GetUserController, UpdateUserController, DeleteUserController };

export default UserController;
