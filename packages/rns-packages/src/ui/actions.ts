import { CategoryId } from '../product-category';
import { creator } from '../shared';

const actionName = 'SET_CURRENT_CATEGORY';
export const actionSetCurrentCategory = creator<CategoryId>(actionName);
