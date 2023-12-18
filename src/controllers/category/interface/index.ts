import { CategoryTypeEnum } from '../../../types';

export interface IAdCreateCategory {
  type: CategoryTypeEnum;
  title: string;
}

export interface IAdGetCategory {
  categoryId: string
  type: CategoryTypeEnum;
}

export interface IAdUpdateCategory {
  categoryId: string;
  type: CategoryTypeEnum;
  title?: string;
}

export interface IAdDeleteCategory {
  categoryId: string;
  type: CategoryTypeEnum;
}
