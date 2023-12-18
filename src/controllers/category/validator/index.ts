import { z } from 'zod';

import { CategoryTypeEnum } from '../../../types';

export const AdCreateCategorySchema = z.object({
  title: z
    .string({
      required_error: 'The title id is required!'
    })
    .min(1),
  type: z.enum([CategoryTypeEnum.expense, CategoryTypeEnum.income], {
    required_error: 'The type is required!'
  })
}).strict();

export const AdGetCategorySchema = z.object({
  categoryId: z
    .string({
      required_error: 'The category id is required!'
    })
    .min(1),
  type: z.enum([CategoryTypeEnum.expense, CategoryTypeEnum.income], {
    required_error: 'The type is required!'
  })
}).strict();

export const AdUpdateCategorySchema = z.object({
  categoryId: z
    .string({
      required_error: 'The category id is required!'
    })
    .min(1),
  title: z
    .string()
    .optional(),
  type: z.enum([CategoryTypeEnum.expense, CategoryTypeEnum.income], {
    required_error: 'The type is required!'
  })
}).strict();

export const AdDeleteCategorySchema = z.object({
  categoryId: z
    .string({
      required_error: 'The category id is required!'
    })
    .min(1),
  type: z.enum([CategoryTypeEnum.expense, CategoryTypeEnum.income], {
    required_error: 'The type is required!'
  })
}).strict();
