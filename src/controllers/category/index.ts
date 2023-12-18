import { FastifyReply, FastifyRequest } from 'fastify';

import { logger } from '../../log';
import { ErrorReplyData } from '../../types';
import { IAdCreateCategory, IAdDeleteCategory, IAdGetCategory, IAdUpdateCategory } from './interface';
import { AdCreateCategoryService } from './service/AdCreateCategory.service';
import { AdDeleteCategoryService } from './service/AdDeleteCategory.service';
import { AdGetCategoryService } from './service/AdGetCategory.service';
import { AdUpdateCategoryService } from './service/AdUpdateCategory.service';
import {
  AdCreateCategorySchema,
  AdDeleteCategorySchema,
  AdGetCategorySchema,
  AdUpdateCategorySchema
} from './validator';

export const AdCreateCategoryController = async (
  req: FastifyRequest<{ Params: Pick<IAdCreateCategory, 'type'>, Body: Omit<IAdCreateCategory, 'type'> }>,
  reply: FastifyReply
) => {
  try {
    const data = AdCreateCategorySchema.parse({ ...req.body, ...req.params });

    const { message, status, category } = await AdCreateCategoryService(data);

    if (!category) {
      reply
        .status(status)
        .send({
          data: {
            message
          }
        });
      return;
    }

    reply
      .status(status)
      .send({
        data: {
          message,
          category
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdCreateCategoryController - ${error.message}`);

    reply
      .status(ErrorReplyData.CREATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.CREATE_ERROR.message
        }
      });
  }
};

export const AdGetCategoryController = async (
  req: FastifyRequest<{ Params: IAdGetCategory }>,
  reply: FastifyReply
) => {
  try {
    const data = AdGetCategorySchema.parse(req.params);

    const { message, status, category } = await AdGetCategoryService(data);

    if (!category) {
      reply
        .status(status)
        .send({
          data: {
            message
          }
        });
      return;
    }

    reply
      .status(status)
      .send({
        data: {
          message,
          category
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdGetCategoryController - ${error.message}`);

    reply
      .status(ErrorReplyData.SEND_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.SEND_ERROR.message
        }
      });
  }
};

export const AdUpdateCategoryController = async (
  req: FastifyRequest<{
    Params: Pick<IAdUpdateCategory, 'categoryId' | 'type'>,
    Body: Pick<IAdUpdateCategory, 'title'>
  }>,
  reply: FastifyReply
) => {
  try {
    const data = AdUpdateCategorySchema.parse({ ...req.params, ...req.body });

    const { message, status, category } = await AdUpdateCategoryService(data);

    if (!category) {
      reply
        .status(status)
        .send({
          data: {
            message
          }
        });
      return;
    }

    reply
      .status(status)
      .send({
        data: {
          message,
          category
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdUpdateCategoryController - ${error.message}`);

    reply
      .status(ErrorReplyData.UPDATE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.UPDATE_ERROR.message
        }
      });
  }
};

export const AdDeleteCategoryController = async (
  req: FastifyRequest<{ Params: IAdDeleteCategory }>,
  reply: FastifyReply
) => {
  try {
    const data = AdDeleteCategorySchema.parse(req.params);

    const { message, status } = await AdDeleteCategoryService(data);

    reply
      .status(status)
      .send({
        data: {
          message
        }
      });
  } catch (error) {
    error instanceof Error &&
      logger.error(`AdDeleteCategoryController - ${error.message}`);

    reply
      .status(ErrorReplyData.DELETE_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.DELETE_ERROR.message
        }
      });
  }
};

const CategoryController = {
  AdCreateCategoryController,
  AdGetCategoryController,
  AdUpdateCategoryController,
  AdDeleteCategoryController
};

export default CategoryController;
