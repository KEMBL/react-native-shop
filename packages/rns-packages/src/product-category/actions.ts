import { createActionSet, creator, FailedActionWithPayload } from 'shared';
import { CategoryId } from './types';

const actionName = 'FETCH_CATEGORIES_WITH_PRODUCTS';
/**
 * Requests categories with preloaded products inisde
 */
export const {
  actionStart: fetchCategoriesWithProducts,
  actionSuccess: fetchCategoriesWithProductsSuccess
} = createActionSet<CategoryId>(actionName);

export const fetchCategoriesWithProductsFail = creator<FailedActionWithPayload<CategoryId>>(actionName);
