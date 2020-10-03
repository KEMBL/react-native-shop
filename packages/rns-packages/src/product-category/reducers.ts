import Debug from 'debug';

import { ApplicationState } from 'initialization';
import { nameofFactory } from 'shared';
import { fetchCategoriesWithProducts } from './actions';
import { ExternalData, ProductCategoryCollection } from './types';

const debug = Debug('app:reducers:fetchCategory');

interface FetchCategoriesWithProductsDoneAction {
  type: string;
  payload: ProductCategoryCollection;
}

interface FetchCategoriesWithProductsFailAction {
  type: string;
  payload?: string;
}

const updateCategories = (state: ExternalData, categories: ProductCategoryCollection): ExternalData => {
  debug('Got categories', categories?.categories.length);
  return state;
};

const updateProducts = (state: ExternalData, categories: ProductCategoryCollection): ExternalData => {
  debug('Got products for categories ', categories?.categories.length);
  return state;
};

type ActionTypes = FetchCategoriesWithProductsDoneAction | FetchCategoriesWithProductsFailAction;

const dataReducer = (state: ExternalData, action: ActionTypes): ExternalData => {
  switch (action.type) {
    case `${fetchCategoriesWithProducts.done}`: {
      const state1 = updateCategories(state, action.payload as ProductCategoryCollection);
      const state2 = updateProducts(state1, action.payload as ProductCategoryCollection);
      return state2;
    }

    case `${fetchCategoriesWithProducts.fail}`:
      debug('Problem with fetching categories with products', action.payload);
      return { ...state };

    default:
      return state;
  }
};

const nameof = nameofFactory<ApplicationState>();

export default {
  [nameof('externalData')]: dataReducer
};
