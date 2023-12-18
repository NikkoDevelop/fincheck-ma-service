import { FastifyReply, FastifyRequest } from 'fastify';

import { logger } from '../../log';
import { ErrorReplyData, IBaseAuthHeader } from '../../types';
import { ICreateTransaction, IDeleteTransaction, IGetTransaction, IUpdateTransaction } from './interface';
import { CreateTransactionService } from './service/CreateTransaction.service';
import { DeleteTransactionService } from './service/DeleteTransaction.service';
import { GetTransactionService } from './service/GetTransaction.service';
import { UpdateTransactionService } from './service/UpdateTransaction.service';
import {
  CreateTransactionSchema,
  DeleteTransactionSchema,
  GetTransactionSchema,
  UpdateTransactionSchema
} from './validator';

export const CreateTransactionController = async (
  req: FastifyRequest<{ Body: ICreateTransaction, Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const data = CreateTransactionSchema.parse(req.body);

    const { message, status, transaction } = await CreateTransactionService(data, req.headers.userId);

    if (!transaction) {
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
          transaction
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`CreateTransactionController - ${error.message}`);

    reply
      .status(ErrorReplyData.CREATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.CREATE_ERROR.message
        }
      });
  }
};

export const GetTransactionController = async (
  req: FastifyRequest<{ Params: IGetTransaction, Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const data = GetTransactionSchema.parse(req.params);

    const { message, status, transaction } = await GetTransactionService(data, req.headers.userId);

    if (!transaction) {
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
          transaction
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetTransactionController - ${error.message}`);

    reply
      .status(ErrorReplyData.SEND_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.SEND_ERROR.message
        }
      });
  }
};

export const UpdateTransactionController = async (
  req: FastifyRequest<{
    Params: Pick<IUpdateTransaction, 'transactionId'>,
    Body: Omit<IUpdateTransaction, 'transactionId'>,
    Headers: IBaseAuthHeader
  }>,
  reply: FastifyReply
) => {
  try {
    const data = UpdateTransactionSchema.parse({ ...req.params, ...req.body });

    const { message, status, transaction } = await UpdateTransactionService(data, req.headers.userId);

    if (!transaction) {
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
          transaction
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`UpdateTransactionController - ${error.message}`);

    reply
      .status(ErrorReplyData.UPDATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.UPDATE_ERROR.message
        }
      });
  }
};

export const DeleteTransactionController = async (
  req: FastifyRequest<{ Params: IDeleteTransaction, Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const data = DeleteTransactionSchema.parse(req.params);

    const { message, status } = await DeleteTransactionService(data, req.headers.userId);

    reply
      .status(status)
      .send({
        data: {
          message
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`DeleteTransactionController - ${error.message}`);

    reply
      .status(ErrorReplyData.DELETE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.DELETE_ERROR.message
        }
      });
  }
};

const TransactionController = {
  CreateTransactionController,
  GetTransactionController,
  UpdateTransactionController,
  DeleteTransactionController
};

export default TransactionController;
