import isEqual from 'lodash.isequal';
import clonedeep from 'lodash.clonedeep';

import { debug as Debug } from '../debug';
import { fetchCategoriesWithProducts } from './actions';
import { externalDataBranchName } from './selectors';
import { CategoryId, ExternalData, ProductCategoryCollection, ProductCategoryModel } from './types';

const debug = Debug('app:reducers:fetchCategory');

interface FetchCategoriesWithProductsDoneAction {
  type: string;
  payload: ProductCategoryCollection;
}

interface FetchCategoriesWithProductsFailAction {
  type: string;
  payload: CategoryId;
}

// const compareCategory = (source: ProductCategoryModel, dest: ProductCategoryModelWithProducts): boolean => {
//   return source.parentId === dest.parentId && source.title === dest.title;
// };

// const compareProduct = (source: ProductModel, dest: ProductModel): boolean => {
//   return source.name === dest.name && source.categoryId === dest.categoryId && source.editDatetime === dest.editDatetime
//   && isEqual(source.imageUrls, dest.imageUrls) && isEqual(source.price, dest.price);
// };

/** Updates state categories and products
 *
 * @param {object} state current state
 * @param {object} collection collection of categories with products
 *
 * @returns {object} state
 */
const updateCategoriesAndProducts = (
  state: ExternalData = new ExternalData(),
  collection: ProductCategoryCollection
): ExternalData => {
  // debug('Got collection', collection);
  // debug('Got categories', collection.categories.length);

  if (!collection) {
    debug('Warning: undefined categories collection');
    return state;
  }

  const categories = collection.categories;
  if (!categories) {
    debug('Warning: undefined categories list');
    return state;
  }

  if (categories.length === 0) {
    debug('Information: empty categories list');
    return state;
  }

  for (const category of categories) {
    const source = state.categories[category.id];
    if (!source || !isEqual(source, category)) {
      const newCategory: ProductCategoryModel = { id: category.id, parentId: category.parentId, title: category.title };
      state.categories[category.id] = newCategory; // at this place we make id -> category relation in our state
    }

    if (!category.products) {
      continue;
    }

    for (const product of category.products) {
      const source = state.products[product.id];
      if (!source || !isEqual(source, product)) {
        state.products[product.id] = clonedeep(product); // at this place we make id -> product relation in our state
      }
    }
  }

  return state;
};

type ActionTypes = FetchCategoriesWithProductsDoneAction | FetchCategoriesWithProductsFailAction;

const dataReducer = (state: ExternalData = new ExternalData(), action: ActionTypes): ExternalData => {
  debug('Reducer after fetching categories with products:', action, state);

  switch (action.type) {
    case `${fetchCategoriesWithProducts.done}`: {
      return updateCategoriesAndProducts(state, action.payload as ProductCategoryCollection);
    }

    case `${fetchCategoriesWithProducts.fail}`:
      debug('Problem with fetching categories with products', action.payload);
      return state;

    default:
      return state;
  }
};

export default {
  [externalDataBranchName]: dataReducer
};
