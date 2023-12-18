import { Transaction } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IUpdateTransaction } from '../interface';

interface IReturnUpdateTransactionServiceData extends IBaseServiceReply {
  transaction?: Transaction,
}

export const UpdateTransactionService = async (
  data: IUpdateTransaction,
  userId: string
): Promise<IReturnUpdateTransactionServiceData> => {
  try {
    const bankAccount = data.bankAccountId
      ? await prisma.bankAccount.findUnique({
        where: {
          id: data.bankAccountId,
          user: {
            id: userId
          }
        }
      })
      : null;

    const category = data.categoryId
      ? data.type === CategoryTypeEnum.income
        ? await prisma.incomeCategory.findUnique({
          where: {
            id: data.categoryId
          }
        })
        : await prisma.expenseCategory.findUnique({
          where: {
            id: data.categoryId
          }
        })
      : null;

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: data.bankAccountId,
        bankAccount: {
          user: {
            id: userId
          }
        }
      },
      data: {
        amount: data.amount,
        description: data.description,
        type: data.type,
        incomeCategory: {
          connect: {
            id: (data.type === CategoryTypeEnum.income && category) ? category.id : undefined
          }
        },
        expenseCategory: {
          connect: {
            id: (data.type === CategoryTypeEnum.expense && category) ? category.id : undefined
          }
        },
        bankAccount: {
          connect: {
            id: bankAccount ? bankAccount.id : undefined
          }
        }
      }
    });

    return {
      message: SuccessReplyData.UPDATE_SUCCESS.message,
      status: SuccessReplyData.UPDATE_SUCCESS.status,
      transaction: updatedTransaction
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`UpdateTransactionService - ${error.message}`);

    return {
      message: ErrorReplyData.UPDATE_ERROR.message,
      status: ErrorReplyData.UPDATE_ERROR.status
    };
  }
};
