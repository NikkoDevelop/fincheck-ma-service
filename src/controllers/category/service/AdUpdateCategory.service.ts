import { ExpenseCategory, IncomeCategory } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdUpdateCategory } from '../interface';

interface IReturnAdUpdateCategoryServiceData extends IBaseServiceReply {
  category?: ExpenseCategory | IncomeCategory,
}

export const AdUpdateCategoryService = async (data: IAdUpdateCategory): Promise<IReturnAdUpdateCategoryServiceData> => {
  try {
    const updatedCategory = data.type === CategoryTypeEnum.income
      ? await prisma.incomeCategory.update({
        where: {
          id: data.categoryId
        },
        data: {
          title: data.title
        }
      })
      : await prisma.expenseCategory.update({
        where: {
          id: data.categoryId
        },
        data: {
          title: data.title
        }
      });

    if (!updatedCategory) {
      return {
        message: ErrorReplyData.UPDATE_ERROR.message,
        status: ErrorReplyData.UPDATE_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.UPDATE_SUCCESS.message,
      status: SuccessReplyData.UPDATE_SUCCESS.status,
      category: updatedCategory
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdUpdateCategoryService - ${error.message}`);

    return {
      message: ErrorReplyData.UPDATE_ERROR.message,
      status: ErrorReplyData.UPDATE_ERROR.status
    };
  }
};
