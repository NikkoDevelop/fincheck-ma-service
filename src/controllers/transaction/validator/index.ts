import { TransactionTypeEnum } from '@prisma/client';
import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  type: z
    .enum([TransactionTypeEnum.expense, TransactionTypeEnum.income], {
      required_error: 'The type is required!'
    }),
  amount: z
    .number({
      required_error: 'The amount is required!'
    })
    .min(1),
  description: z
    .string()
    .optional(),
  bankAccountId: z
    .string({
      required_error: 'The bank account id is required!'
    })
    .min(1),
  categoryId: z
    .string({
      required_error: 'The category id is required!'
    })
    .min(1)
}).strict();

export const GetTransactionSchema = z.object({
  transactionId: z
    .string({
      required_error: 'The transaction id is required!'
    })
    .min(1)
}).strict();

export const UpdateTransactionSchema = z.object({
  transactionId: z
    .string({
      required_error: 'The transaction id is required!'
    })
    .min(1),
  type: z
    .enum([TransactionTypeEnum.expense, TransactionTypeEnum.income])
    .optional(),
  amount: z
    .number()
    .min(1, {
      message: 'Amount cannot be less than 0'
    })
    .optional(),
  description: z
    .string()
    .optional(),
  bankAccountId: z
    .string()
    .optional(),
  categoryId: z
    .string()
    .optional()
}).strict();

export const DeleteTransactionSchema = z.object({
  transactionId: z
    .string({
      required_error: 'The transaction id is required!'
    })
    .min(1)
}).strict();
