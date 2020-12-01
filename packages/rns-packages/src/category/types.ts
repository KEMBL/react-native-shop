import { ProductCategoryModel, ProductCategoryModelWithProducts } from 'rns-types';

export interface ProductCategoryCollection {
  categories: ProductCategoryModelWithProducts[];
}

export interface CategoriesCollection {
  categories: ProductCategoryModel[];
}
