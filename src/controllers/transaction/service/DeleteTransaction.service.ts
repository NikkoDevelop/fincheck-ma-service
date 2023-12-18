import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IDeleteTransaction } from '../interface';

interface IReturnDeleteTransactionServiceData extends IBaseServiceReply { }

export const DeleteTransactionService = async (
  data: IDeleteTransaction,
  userId: string
): Promise<IReturnDeleteTransactionServiceData> => {
  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id: data.transactionId,
        bankAccount: {
          user: {
            id: userId
          }
        }
      }
    });

    if (!deletedTransaction) {
      return {
        message: ErrorReplyData.DELETE_ERROR.message,
        status: ErrorReplyData.DELETE_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.DELETE_SUCCESS.message,
      status: SuccessReplyData.DELETE_SUCCESS.status
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`DeleteTransactionService - ${error.message}`);

    return {
      message: ErrorReplyData.DELETE_ERROR.message,
      status: ErrorReplyData.DELETE_ERROR.status
    };
  }
};
