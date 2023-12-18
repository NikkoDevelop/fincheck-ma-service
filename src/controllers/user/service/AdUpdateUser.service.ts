import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import validate from 'deep-email-validator';

import { HASH_COIN } from '../../../config';
import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdUpdateUser } from '../interface';

interface IReturnAdUpdateUserServiceData extends IBaseServiceReply {
  user?: User,
}

export const AdUpdateUserService = async (data: IAdUpdateUser): Promise<IReturnAdUpdateUserServiceData> => {
  try {
    let passwordHash: string | undefined;

    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, Number(HASH_COIN));
    }

    if (data.email) {
      const isEmailExist = await validate(data.email);

      if (!isEmailExist.valid) {
        return {
          message: ErrorReplyData.EXIST_EMAIL_ERROR.message,
          status: ErrorReplyData.EXIST_EMAIL_ERROR.status
        };
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: data.userId
      },
      data: {
        email: data.email,
        passwordHash,
        role: data.role
      }
    });

    if (!updatedUser) {
      return {
        message: ErrorReplyData.UPDATE_ERROR.message,
        status: ErrorReplyData.UPDATE_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.UPDATE_SUCCESS.message,
      status: SuccessReplyData.UPDATE_SUCCESS.status,
      user: updatedUser
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdUpdateUserService - ${error.message}`);

    return {
      message: ErrorReplyData.UPDATE_ERROR.message,
      status: ErrorReplyData.UPDATE_ERROR.status
    };
  }
};
