import { Transaction } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IFindTransactions } from '../interface';

interface IReturnFindTransactionsServiceData extends IBaseServiceReply {
  transactions?: Transaction[],
}

export const FindTransactionsService = async (
  data: IFindTransactions,
  userId: string
): Promise<IReturnFindTransactionsServiceData> => {
  try {
    const foundTransactions = await prisma.transaction.findMany({
      where: {
        AND: [
          {
            bankAccount: {
              user: {
                id: userId
              }
            }
          },
          {
            AND: [
              {
                bankAccount: {
                  id: data.bankAccountId
                }
              },
              {
                type: data.type
              },
              {
                amount: {
                  lte: data.amount ? data.amount.end : undefined,
                  gte: data.amount ? data.amount.start : undefined
                }
              },
              {
                createdAt: {
                  lte: data.period ? data.period.end : undefined,
                  gte: data.period ? data.period.start : undefined
                }
              }
            ]
          }
        ]
      }
    });

    if (!foundTransactions) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      transactions: foundTransactions
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`FindTransactionsService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
