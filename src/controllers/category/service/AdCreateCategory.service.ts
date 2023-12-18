import { ExpenseCategory, IncomeCategory } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdCreateCategory } from '../interface';

interface IReturnAdCreateCategoryServiceData extends IBaseServiceReply {
  category?: ExpenseCategory | IncomeCategory,
}

export const AdCreateCategoryService = async (data: IAdCreateCategory): Promise<IReturnAdCreateCategoryServiceData> => {
  try {
    const newCategory = data.type === CategoryTypeEnum.income
      ? await prisma.incomeCategory.create({
        data: {
          title: data.title
        }
      })
      : await prisma.expenseCategory.create({
        data: {
          title: data.title
        }
      });

    return {
      message: SuccessReplyData.CREATE_SUCCESS.message,
      status: SuccessReplyData.CREATE_SUCCESS.status,
      category: newCategory
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdCreateCategoryService - ${error.message}`);

    return {
      message: ErrorReplyData.CREATE_ERROR.message,
      status: ErrorReplyData.CREATE_ERROR.status
    };
  }
};
