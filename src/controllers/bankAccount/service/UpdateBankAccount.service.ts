import { BankAccount } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IUpdateBankAccount } from '../interface';

interface IReturnUpdateBankAccountServiceData extends IBaseServiceReply {
  bankAccount?: BankAccount,
}

export const UpdateBankAccountService = async (
  data: IUpdateBankAccount,
  userId: string
): Promise<IReturnUpdateBankAccountServiceData> => {
  try {
    const updatedBankAccount = await prisma.bankAccount.update({
      where: {
        id: data.bankAccountId,
        user: {
          id: userId
        }
      },
      data: {
        title: data.title,
        type: data.type
      }
    });

    return {
      message: SuccessReplyData.UPDATE_SUCCESS.message,
      status: SuccessReplyData.UPDATE_SUCCESS.status,
      bankAccount: updatedBankAccount
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`UpdateBankAccountService - ${error.message}`);

    return {
      message: ErrorReplyData.UPDATE_ERROR.message,
      status: ErrorReplyData.UPDATE_ERROR.status
    };
  }
};
