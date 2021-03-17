import { ProductModel, ProductsCollection } from 'rns-types';

import { debug as Debug, nameofFactory } from 'rns-packages/src/shared';
import { ExternalData, FailedActionResult } from 'rns-packages/src/shared/types';

import { fetchProducts } from './actions';

const debug = Debug('app:reducers:fetchProduct');

export interface FetchProductsDoneAction {
  type: string;
  payload: ProductsCollection;
}

export interface FetchProductsFailAction {
  type: string;
  payload: FailedActionResult;
}

type ActionTypes = FetchProductsDoneAction | FetchProductsFailAction;

const dataReducer = (state: ProductModel[] = [], action: ActionTypes): ProductModel[] => {
  // debug('Reducer after fetching products:', action, state);

  switch (action.type) {
    case `${fetchProducts.done}`: {
      return (action.payload as ProductsCollection).products;
    }

    case `${fetchProducts.fail}`: {
      debug('Problem with fetching products', action);
      return state;
    }

    default:
      return state;
  }
};

const branchName = 'products';
nameofFactory<ExternalData>()(branchName);

export default {
  [branchName]: dataReducer // TODO: use slice here
};
