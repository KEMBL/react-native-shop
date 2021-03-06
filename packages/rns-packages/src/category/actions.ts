import { CategoryId } from 'rns-types';

import { FailedActionResult, FailedActionResultWithPayload } from 'rns-packages/src/shared/types';
import { actionCreator } from 'rns-packages/src/shared';
import { CategoriesCollection, ProductCategoryCollection } from './types';

/**
 * Requests categories with preloaded products inisde
 */
const actionName = 'FETCH_CATEGORIES_WITH_PRODUCTS';
const start = actionCreator.start<CategoryId>(actionName);
const done = actionCreator.done<ProductCategoryCollection>(actionName);
const fail = actionCreator.fail<FailedActionResultWithPayload<CategoryId>>(actionName);

export const fetchCategoriesWithProducts = { start, done, fail };

const actionNameAll = 'FETCH_ALL_CATEGORIES';
const startAll = actionCreator.start(actionNameAll);
const doneAll = actionCreator.done<CategoriesCollection>(actionNameAll);
const failAll = actionCreator.fail<FailedActionResult>(actionNameAll);

export const fetchCategories = { start: startAll, done: doneAll, fail: failAll };
