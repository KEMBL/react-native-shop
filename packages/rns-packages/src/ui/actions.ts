import { CategoryId } from 'rns-packages/src/shared/types';
import { actionCreator } from 'rns-packages/src/shared';

/**
 * Sets selected in UI category
 */
const actionName = 'SET_CURRENT_CATEGORY';
const start = actionCreator.start<CategoryId>(actionName);

export const actionSetCurrentCategory = { start };
