import { User } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdGetUser } from '../interface';

interface IReturnAdGetUserServiceData extends IBaseServiceReply {
  user?: User,
}

export const AdGetUserService = async (data: IAdGetUser): Promise<IReturnAdGetUserServiceData> => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: data.userId
      }
    });

    if (!foundUser) {
      return {
        message: ErrorReplyData.EXIST_USER_ERROR.message,
        status: ErrorReplyData.EXIST_USER_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      user: foundUser
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdGetUserService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
