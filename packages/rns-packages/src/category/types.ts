import { IdentifierId, ProductModel } from 'rns-types';

export type CategoryId = number;
export const RootCategoryId: CategoryId = 0;

export interface ProductCategoryModel extends IdentifierId<CategoryId> {
  parentId: number;
  title: string;
}

export interface ProductCategoryModelWithProducts extends ProductCategoryModel {
  products?: ProductModel[];
}

export interface ProductCategoryCollection {
  categories: ProductCategoryModelWithProducts[];
}

export interface CategoriesCollection {
  categories: ProductCategoryModel[];
}
