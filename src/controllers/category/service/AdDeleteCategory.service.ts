import { logger } from '../../../log';
import prisma from '../../../prisma';
import { CategoryTypeEnum, ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';
import { IAdDeleteCategory } from '../interface';

interface IReturnAdDeleteCategoryServiceData extends IBaseServiceReply { }

export const AdDeleteCategoryService = async (data: IAdDeleteCategory): Promise<IReturnAdDeleteCategoryServiceData> => {
  try {
    const deletedCategory = data.type === CategoryTypeEnum.income
      ? await prisma.incomeCategory.delete({
        where: {
          id: data.categoryId
        }
      })
      : await prisma.expenseCategory.delete({
        where: {
          id: data.categoryId
        }
      });

    if (!deletedCategory) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    return {
      message: SuccessReplyData.DELETE_SUCCESS.message,
      status: SuccessReplyData.DELETE_SUCCESS.status
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdDeleteCategoryService - ${error.message}`);

    return {
      message: ErrorReplyData.DELETE_ERROR.message,
      status: ErrorReplyData.DELETE_ERROR.status
    };
  }
};
