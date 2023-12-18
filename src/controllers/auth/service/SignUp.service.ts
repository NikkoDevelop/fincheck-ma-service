import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import validate from 'deep-email-validator';

import { HASH_COIN } from '../../../config';
import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { ISignUpUser } from '../interface';

interface IReturnSignUpServiceData extends IBaseServiceReply {
  user?: User
}

export const SignUpUserService = async (data: ISignUpUser): Promise<IReturnSignUpServiceData> => {
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (existUser) {
      return {
        message: ErrorReplyData.EXIST_USER_ERROR.message,
        status: ErrorReplyData.EXIST_USER_ERROR.status
      };
    }

    const isEmailExist = await validate(data.email);

    if (!isEmailExist.valid) {
      return {
        message: ErrorReplyData.EXIST_EMAIL_ERROR.message,
        status: ErrorReplyData.EXIST_EMAIL_ERROR.status
      };
    }

    const passwordHash = await bcrypt.hash(data.password, Number(HASH_COIN));

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        role: 'resident'
      }
    });

    return {
      message: SuccessReplyData.AUTHENTICATION_SUCCESS.message,
      status: SuccessReplyData.AUTHENTICATION_SUCCESS.status,
      user
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`SignUpService - ${error.message}`);

    return {
      message: ErrorReplyData.AUTHENTICATION_ERROR.message,
      status: ErrorReplyData.AUTHENTICATION_ERROR.status
    };
  }
};
