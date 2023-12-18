import { BankAccount } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { ICreateBankAccount } from '../interface';

interface IReturnCreateBankAccountServiceData extends IBaseServiceReply {
  bankAccount?: BankAccount,
}

export const CreateBankAccountService = async (
  data: ICreateBankAccount,
  userId: string
): Promise<IReturnCreateBankAccountServiceData> => {
  try {
    const bankAccountCount = await prisma.bankAccount.count({
      where: {
        userId
      }
    });

    const title: string = `Bank Account №${bankAccountCount}`;

    const newBankAccount = await prisma.bankAccount.create({
      data: {
        title: data.title ? data.title : title,
        type: data.type,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });

    return {
      message: SuccessReplyData.CREATE_SUCCESS.message,
      status: SuccessReplyData.CREATE_SUCCESS.status,
      bankAccount: newBankAccount
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`CreateBankAccountService - ${error.message}`);

    return {
      message: ErrorReplyData.CREATE_ERROR.message,
      status: ErrorReplyData.CREATE_ERROR.status
    };
  }
};
