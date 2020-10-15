import { CategoryId } from '../category';
import { actionCreator } from '../shared';

/**
 * Sets selected in UI category
 */
const actionName = 'SET_CURRENT_CATEGORY';
const start = actionCreator.start<CategoryId>(actionName);

export const actionSetCurrentCategory = { start };
