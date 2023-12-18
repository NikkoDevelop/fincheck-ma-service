import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdDeleteUser } from '../interface';

interface IReturnAdDeleteUserServiceData extends IBaseServiceReply { }

export const AdDeleteUserService = async (data: IAdDeleteUser): Promise<IReturnAdDeleteUserServiceData> => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: data.userId
      }
    });

    if (!deletedUser) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.DELETE_SUCCESS.message,
      status: SuccessReplyData.DELETE_SUCCESS.status
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdDeleteUserService - ${error.message}`);

    return {
      message: ErrorReplyData.DELETE_ERROR.message,
      status: ErrorReplyData.DELETE_ERROR.status
    };
  }
};
