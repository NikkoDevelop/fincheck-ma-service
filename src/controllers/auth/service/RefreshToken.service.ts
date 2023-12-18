import { User } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { createRefreshToken, createToken, verifyRefreshToken } from '../../../utils/jwt';

interface IReturnRefreshTokenServiceData extends IBaseServiceReply {
  user?: User,
  token?: string,
  refreshToken?: string
}

export const RefreshTokenService = async (oldToken: string): Promise<IReturnRefreshTokenServiceData> => {
  try {
    const verifyToken = verifyRefreshToken(oldToken);

    if (typeof verifyToken === 'string') {
      return {
        message: ErrorReplyData.TOKEN_VALID_ERROR.message,
        status: ErrorReplyData.TOKEN_VALID_ERROR.status
      };
    }

    const findUser = await prisma.user.findUnique({
      where: {
        id: verifyToken.userId
      }
    });

    if (!findUser) {
      return {
        message: ErrorReplyData.NON_EXIST_USER_ERROR.message,
        status: ErrorReplyData.NON_EXIST_USER_ERROR.status
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
      logger.error(`SignUpService - ${error.message}`);

    return {
      message: ErrorReplyData.AUTHENTICATION_ERROR.message,
      status: ErrorReplyData.AUTHENTICATION_ERROR.status
    };
  }
};
