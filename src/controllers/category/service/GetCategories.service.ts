import { ExpenseCategory, IncomeCategory } from '@prisma/client';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IGetCategories } from '../interface';

interface IReturnGetCategoriesServiceData extends IBaseServiceReply {
  categories?: ExpenseCategory[] | IncomeCategory[],
}

export const GetCategoriesService = async (data: IGetCategories): Promise<IReturnGetCategoriesServiceData> => {
  try {
    const foundCategories = data.type === CategoryTypeEnum.income
      ? await prisma.incomeCategory.findMany()
      : await prisma.expenseCategory.findMany();

    if (!foundCategories) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      categories: foundCategories
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetCategoriesService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
