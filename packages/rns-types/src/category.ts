import { ProductModel } from './product';
import { IdentifierId } from './shared';

export type CategoryId = number;
export const RootCategoryId: CategoryId = 0;

export interface ProductCategoryModel extends IdentifierId<CategoryId> {
  parentId: number;
  title: string;
}

export interface ProductCategoryModelWithProducts extends ProductCategoryModel {
  products?: ProductModel[];
}
