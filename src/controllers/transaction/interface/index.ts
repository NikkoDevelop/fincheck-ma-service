import { TransactionTypeEnum } from '@prisma/client';

export interface ICreateTransaction {
  type: TransactionTypeEnum
  amount: number;
  description?: string;
  bankAccountId: string;
  categoryId: string;
}

export interface IGetTransaction {
  transactionId: string;
}

export interface IUpdateTransaction {
  transactionId: string;
  type?: TransactionTypeEnum
  amount?: number;
  description?: string;
  bankAccountId?: string;
  categoryId?: string;
}

export interface IDeleteTransaction {
  transactionId: string;
}
