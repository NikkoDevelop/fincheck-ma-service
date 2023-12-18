import { BankAccountTypeEnum } from '@prisma/client';

export interface ICreateBankAccount {
  title?: string;
  type: BankAccountTypeEnum
}

export interface IAdCreateBankAccount extends ICreateBankAccount {
  userId: string
}

export interface IGetBankAccount {
  bankAccountId: string;
}

export interface IAdGetBankAccount extends IGetBankAccount { }

export interface IUpdateBankAccount {
  bankAccountId: string;
  title?: string;
  type?: BankAccountTypeEnum
}

export interface IAdUpdateBankAccount extends IUpdateBankAccount { }

export interface IDeleteBankAccount {
  bankAccountId: string;
}

export interface IAdDeleteBankAccount extends IDeleteBankAccount { }
