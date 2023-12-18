import { Transaction } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IGetTransaction } from '../interface';

interface IReturnGetTransactionServiceData extends IBaseServiceReply {
  transaction?: Transaction,
}

export const GetTransactionService = async (
  data: IGetTransaction,
  userId: string
): Promise<IReturnGetTransactionServiceData> => {
  try {
    const foundTransaction = await prisma.transaction.findUnique({
      where: {
        id: data.transactionId,
        bankAccount: {
          user: {
            id: userId
          }
        }
      }
    });

    if (!foundTransaction) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      transaction: foundTransaction
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetTransactionService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
