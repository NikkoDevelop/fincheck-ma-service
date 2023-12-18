import { BankAccountTypeEnum } from '@prisma/client';
import { z } from 'zod';

export const CreateBankAccountSchema = z.object({
  title: z
    .string()
    .optional(),
  type: z.enum([BankAccountTypeEnum.credit, BankAccountTypeEnum.debit], {
    required_error: 'The role is required!'
  })
}).strict();

export const AdCreateBankAccountSchema = z.object({
  userId: z
    .string({
      required_error: 'The user id is required!'
    })
    .min(1),
  title: z
    .string()
    .optional(),
  type: z.enum([BankAccountTypeEnum.credit, BankAccountTypeEnum.debit], {
    required_error: 'The role is required!'
  })
}).strict();

export const GetBankAccountSchema = z.object({
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1)
}).strict();

export const AdGetBankAccountSchema = z.object({
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1)
}).strict();

export const UpdateBankAccountSchema = z.object({
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1),
  title: z
    .string()
    .optional(),
  type: z
    .enum([BankAccountTypeEnum.credit, BankAccountTypeEnum.debit])
    .optional()
}).strict();

export const AdUpdateBankAccountSchema = z.object({
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1),
  title: z
    .string()
    .optional(),
  type: z
    .enum([BankAccountTypeEnum.credit, BankAccountTypeEnum.debit])
    .optional()
}).strict();

export const DeleteBankAccountSchema = z.object({
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1)
}).strict();

export const AdDeleteBankAccountSchema = z.object({
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1)
}).strict();
