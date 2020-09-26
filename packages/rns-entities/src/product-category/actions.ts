import { creator } from 'shared';
import { CategoryId } from './types';

/**
 * Requests categories iniside the given one
 */
export const fetchCategoriesWithProducts = creator<CategoryId>('FETCH_CATEGORIES_WITH_PRODUCTS');
