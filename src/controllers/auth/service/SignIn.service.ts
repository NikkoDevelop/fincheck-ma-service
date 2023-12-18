import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { createRefreshToken, createToken } from '../../../utils/jwt';
import { ISignInUser } from '../interface';

interface IReturnSignInServiceData extends IBaseServiceReply {
  user?: User,
  token?: string,
  refreshToken?: string
}

export const SignInUserService = async (data: ISignInUser): Promise<IReturnSignInServiceData> => {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!findUser) {
      return {
        message: ErrorReplyData.NON_EXIST_USER_ERROR.message,
        status: ErrorReplyData.NON_EXIST_USER_ERROR.status
      };
    }

    const passwordMatch = await bcrypt.compare(data.password, findUser.passwordHash);

    if (!passwordMatch) {
      return {
        message: ErrorReplyData.PASSWORD_MATCH_ERROR.message,
        status: ErrorReplyData.PASSWORD_MATCH_ERROR.status
      };
    }

    const accessToken = createToken(findUser);
    const refreshToken = createRefreshToken(findUser);

    return {
      message: SuccessReplyData.AUTHENTICATION_SUCCESS.message,
      status: SuccessReplyData.AUTHENTICATION_SUCCESS.status,
      token: accessToken,
      refreshToken,
      user: findUser
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`SignInService - ${error.message}`);

    return {
      message: ErrorReplyData.AUTHENTICATION_ERROR.message,
      status: ErrorReplyData.AUTHENTICATION_ERROR.status
    };
  }
};
