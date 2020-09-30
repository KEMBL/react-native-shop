import { createActionSet } from 'shared';
import { CategoryId } from './types';

/**
 * Requests categories with preloaded products inisde
 */
export const {
  actionStart: fetchCategoriesWithProducts,
  actionSuccess: fetchCategoriesWithProductsSuccess,
  actionFail: fetchCategoriesWithProductsFail
} = createActionSet<CategoryId>('FETCH_CATEGORIES_WITH_PRODUCTS');
