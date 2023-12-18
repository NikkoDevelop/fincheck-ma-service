import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IDeleteBankAccount } from '../interface';

interface IReturnDeleteBankAccountServiceData extends IBaseServiceReply { }

export const DeleteBankAccountService = async (
  data: IDeleteBankAccount,
  userId: string
): Promise<IReturnDeleteBankAccountServiceData> => {
  try {
    const deletedBankAccount = await prisma.bankAccount.delete({
      where: {
        id: data.bankAccountId,
        user: {
          id: userId
        }
      }
    });

    if (!deletedBankAccount) {
      return {
        message: ErrorReplyData.EXIST_USER_ERROR.message,
        status: ErrorReplyData.EXIST_USER_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.DELETE_SUCCESS.message,
      status: SuccessReplyData.DELETE_SUCCESS.status
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`DeleteBankAccountService - ${error.message}`);

    return {
      message: ErrorReplyData.DELETE_ERROR.message,
      status: ErrorReplyData.DELETE_ERROR.status
    };
  }
};
