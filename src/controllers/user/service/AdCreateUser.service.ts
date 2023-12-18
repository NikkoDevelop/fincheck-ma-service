import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import validate from 'deep-email-validator';

import { HASH_COIN } from '../../../config';
import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdCreateUser } from '../interface';

interface IReturnAdCreateUserServiceData extends IBaseServiceReply {
  user?: User,
}

export const AdCreateUserService = async (data: IAdCreateUser): Promise<IReturnAdCreateUserServiceData> => {
  try {
    const passwordHash = await bcrypt.hash(data.password, Number(HASH_COIN));

    const isEmailExist = await validate(data.email);

    if (!isEmailExist.valid) {
      return {
        message: ErrorReplyData.EXIST_EMAIL_ERROR.message,
        status: ErrorReplyData.EXIST_EMAIL_ERROR.status
      };
    }

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        role: data.role
      }
    });

    return {
      message: SuccessReplyData.CREATE_SUCCESS.message,
      status: SuccessReplyData.CREATE_SUCCESS.status,
      user: newUser
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdCreateUserService - ${error.message}`);

    return {
      message: ErrorReplyData.CREATE_ERROR.message,
      status: ErrorReplyData.CREATE_ERROR.status
    };
  }
};
