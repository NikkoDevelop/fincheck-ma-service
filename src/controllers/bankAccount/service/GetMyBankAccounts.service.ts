import { BankAccount } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';

interface IReturnGetMyBankAccountsServiceData extends IBaseServiceReply {
  accounts?: BankAccount[],
}

export const GetMyBankAccountsService = async (
  userId: string
): Promise<IReturnGetMyBankAccountsServiceData> => {
  try {
    const foundBankAccounts = await prisma.bankAccount.findMany({
      where: {
        user: {
          id: userId
        }
      }
    });

    if (!foundBankAccounts) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      accounts: foundBankAccounts
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetMyBankAccountsService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
