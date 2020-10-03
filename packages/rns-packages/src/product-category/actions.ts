import { creator, FailedActionWithPayload } from 'shared';
import { CategoryId, ProductCategoryCollection } from './types';

const actionName = 'FETCH_CATEGORIES_WITH_PRODUCTS';
/**
 * Requests categories with preloaded products inisde
 */
// export const {
//   actionStart: fetchCategoriesWithProducts,
//   actionSuccess: fetchCategoriesWithProductsSuccess
// } = createActionSet<CategoryId>(actionName);

//export const fetchCategoriesWithProductsFail = creator<FailedActionWithPayload<CategoryId>>(actionName);

const start = creator<CategoryId>(actionName);
const done = creator<ProductCategoryCollection>(actionName);
const fail = creator<FailedActionWithPayload<CategoryId>>(actionName);

export const fetchCategoriesWithProducts = { start, done, fail };
