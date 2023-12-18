import { ExpenseCategory, IncomeCategory } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdGetCategory } from '../interface';

interface IReturnAdGetCategoryServiceData extends IBaseServiceReply {
  category?: ExpenseCategory | IncomeCategory,
}

export const AdGetCategoryService = async (data: IAdGetCategory): Promise<IReturnAdGetCategoryServiceData> => {
  try {
    const foundCategory = data.type === CategoryTypeEnum.income
      ? await prisma.incomeCategory.findUnique({
        where: {
          id: data.categoryId
        }
      })
      : await prisma.expenseCategory.findUnique({
        where: {
          id: data.categoryId
        }
      });

    if (!foundCategory) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      category: foundCategory
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdGetCategoryService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
