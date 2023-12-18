import { BankAccount } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IGetBankAccount } from '../interface';

interface IReturnGetBankAccountServiceData extends IBaseServiceReply {
  bankAccount?: BankAccount,
}

export const GetBankAccountService = async (
  data: IGetBankAccount,
  userId: string
): Promise<IReturnGetBankAccountServiceData> => {
  try {
    const foundBankAccount = await prisma.bankAccount.findUnique({
      where: {
        id: data.bankAccountId,
        user: {
          id: userId
        }
      }
    });

    if (!foundBankAccount) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      bankAccount: foundBankAccount
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetBankAccountService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
