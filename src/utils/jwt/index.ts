import { User } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../config';

export const createToken = (user: User): string => {
  return sign({
    userId: user.id,
    role: user.role
  }, JWT_ACCESS_SECRET, {
    algorithm: 'HS256',
    expiresIn: '48h'
  });
};

export const verifyAccessToken = (accessToken: string) => {
  return verify(accessToken, JWT_ACCESS_SECRET);
};

export const createRefreshToken = (user: User): string => {
  return sign({
    userId: user.id
  }, JWT_REFRESH_SECRET, {
    algorithm: 'HS256',
    expiresIn: '60d'
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  return verify(refreshToken, JWT_REFRESH_SECRET);
};
