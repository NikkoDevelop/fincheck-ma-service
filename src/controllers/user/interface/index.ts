import { UserRoleEnum } from '@prisma/client';

export interface IAdCreateUser {
  email: string;
  password: string;
  role: UserRoleEnum;
}

export interface IAdGetUser {
  userId: string
}

export interface IAdUpdateUser {
  userId: string;
  email?: string;
  password?: string;
  role?: UserRoleEnum;
}

export interface IAdDeleteUser {
  userId: string
}
