import { FastifyReply, FastifyRequest } from 'fastify';

import { logger } from '../../log';
import { ErrorReplyData, IBaseAuthHeader } from '../../types';
import { ICreateBankAccount, IDeleteBankAccount, IGetBankAccount, IUpdateBankAccount } from './interface';
import { CreateBankAccountService } from './service/CreateBankAccount.service';
import { DeleteBankAccountService } from './service/DeleteBankAccount.service';
import { GetBankAccountService } from './service/GetBankAccount.service';
import { GetMyBankAccountsService } from './service/GetMyBankAccounts.service';
import { UpdateBankAccountService } from './service/UpdateBankAccount.service';
import {
  CreateBankAccountSchema,
  DeleteBankAccountSchema,
  GetBankAccountSchema,
  UpdateBankAccountSchema
} from './validator';

export const CreateBankAccountController = async (
  req: FastifyRequest<{ Body: ICreateBankAccount, Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const data = CreateBankAccountSchema.parse(req.body);

    const { message, status, bankAccount } = await CreateBankAccountService(data, req.headers.userId);

    if (!bankAccount) {
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
          bankAccount
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`CreateBankAccountController - ${error.message}`);

    reply
      .status(ErrorReplyData.CREATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.CREATE_ERROR.message
        }
      });
  }
};

export const GetBankAccountController = async (
  req: FastifyRequest<{ Params: IGetBankAccount, Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const data = GetBankAccountSchema.parse(req.params);

    const { message, status, bankAccount } = await GetBankAccountService(data, req.headers.userId);

    if (!bankAccount) {
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
          bankAccount
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetBankAccountController - ${error.message}`);

    reply
      .status(ErrorReplyData.SEND_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.SEND_ERROR.message
        }
      });
  }
};

export const UpdateBankAccountController = async (
  req: FastifyRequest<{
    Params: Pick<IUpdateBankAccount, 'bankAccountId'>,
    Body: Omit<IUpdateBankAccount, 'bankAccountId'>,
    Headers: IBaseAuthHeader
  }>,
  reply: FastifyReply
) => {
  try {
    const data = UpdateBankAccountSchema.parse({ ...req.params, ...req.body });

    const { message, status, bankAccount } = await UpdateBankAccountService(data, req.headers.userId);

    if (!bankAccount) {
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
          bankAccount
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`UpdateBankAccountController - ${error.message}`);

    reply
      .status(ErrorReplyData.UPDATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.UPDATE_ERROR.message
        }
      });
  }
};

export const DeleteBankAccountController = async (
  req: FastifyRequest<{ Params: IDeleteBankAccount, Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const data = DeleteBankAccountSchema.parse(req.params);

    const { message, status } = await DeleteBankAccountService(data, req.headers.userId);

    reply
      .status(status)
      .send({
        data: {
          message
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`DeleteBankAccountController - ${error.message}`);

    reply
      .status(ErrorReplyData.DELETE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.DELETE_ERROR.message
        }
      });
  }
};

export const GetMyBankAccountsController = async (
  req: FastifyRequest<{ Headers: IBaseAuthHeader }>,
  reply: FastifyReply
) => {
  try {
    const { message, status, accounts } = await GetMyBankAccountsService(req.headers.userId);

    if (!accounts) {
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
          accounts
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetMyBankAccountsController - ${error.message}`);

    reply
      .status(ErrorReplyData.SEND_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.SEND_ERROR.message
        }
      });
  }
};

const BankAccountController = {
  CreateBankAccountController,
  GetBankAccountController,
  UpdateBankAccountController,
  DeleteBankAccountController,
  GetMyBankAccountsController
};

export default BankAccountController;
