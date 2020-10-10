import { actionCreator, FailedPayload } from '../shared';
import { CategoryId, ProductCategoryCollection } from './types';

/**
 * Requests categories with preloaded products inisde
 */
const actionName = 'FETCH_CATEGORIES_WITH_PRODUCTS';
const start = actionCreator.start<CategoryId>(actionName);
const done = actionCreator.done<ProductCategoryCollection>(actionName);
const fail = actionCreator.fail<FailedPayload<CategoryId>>(actionName);

export const fetchCategoriesWithProducts = { start, done, fail };
