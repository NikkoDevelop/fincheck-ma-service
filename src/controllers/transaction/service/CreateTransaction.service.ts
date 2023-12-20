import { Transaction } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { ICreateTransaction } from '../interface';

interface IReturnCreateTransactionServiceData extends IBaseServiceReply {
  transaction?: Transaction,
}

export const CreateTransactionService = async (
  data: ICreateTransaction,
  userId: string
): Promise<IReturnCreateTransactionServiceData> => {
  try {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: {
        id: data.bankAccountId,
        user: {
          id: userId
        }
      }
    });

    if (!bankAccount) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    const category = data.type === CategoryTypeEnum.income
      ? await prisma.incomeCategory.findUnique({
        where: {
          id: data.categoryId
        }
      })
      : await prisma.expenseCategory.findUnique({
        where: {
          id: data.categoryId
        }
      });

    if (!category) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount: data.amount,
        description: data.description,
        type: data.type,
        incomeCategory: data.type === CategoryTypeEnum.income
          ? {
            connect: {
              id: category.id
            }
          }
          : undefined,
        expenseCategory: data.type === CategoryTypeEnum.expense
          ? {
            connect: {
              id: category.id
            }
          }
          : undefined,
        bankAccount: {
          connect: {
            id: bankAccount.id
          }
        }
      }
    });

    return {
      message: SuccessReplyData.CREATE_SUCCESS.message,
      status: SuccessReplyData.CREATE_SUCCESS.status,
      transaction: newTransaction
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`CreateTransactionService - ${error.message}`);

    return {
      message: ErrorReplyData.CREATE_ERROR.message,
      status: ErrorReplyData.CREATE_ERROR.status
    };
  }
};
