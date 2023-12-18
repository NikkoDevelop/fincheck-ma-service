import { UserRoleEnum } from '@prisma/client';
import { z } from 'zod';

export const AdCreateUserSchema = z.object({
  email: z.string({
    required_error: 'The email is required!'
  })
    .email()
    .min(1),

  password: z.string({
    required_error: 'The password is required!'
  })
    .min(8),

  role: z.enum([UserRoleEnum.admin, UserRoleEnum.resident], {
    required_error: 'The role is required!'
  })
}).strict();

export const AdGetUserSchema = z.object({
  userId: z.string({
    required_error: 'The user id is required!'
  })
    .min(1)
}).strict();

export const AdUpdateUserSchema = z.object({
  userId: z.string({
    required_error: 'The user id is required!'
  })
    .min(1),

  email: z.string()
    .email()
    .optional(),

  password: z.string()
    .optional(),

  role: z.enum([UserRoleEnum.admin, UserRoleEnum.resident])
    .optional()
}).strict();

export const AdDeleteUserSchema = z.object({
  userId: z.string({
    required_error: 'The user id is required!'
  })
    .min(1)
}).strict();
