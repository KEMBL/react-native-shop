import { CategoryId, ProductId } from 'rns-types';

import { actionCreator } from 'rns-packages/src/shared';

/**
 * Sets selected in UI category
 */
const setCurrentCategoryStart = actionCreator.start<CategoryId>('SET_CURRENT_CATEGORY');
export const actionSetCurrentCategory = { start: setCurrentCategoryStart };

/**
 * Sets selected in UI product
 */
const setCurrentProductStart = actionCreator.start<ProductId>('SET_CURRENT_PRODUCT');
export const actionSetCurrentProduct = { start: setCurrentProductStart };
