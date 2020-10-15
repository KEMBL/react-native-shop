import { debug as Debug } from '../debug';
import { fetchProducts } from './actions';
import { ProductModel, ProductsCollection } from './types';
import { FailedActionResult, nameofFactory } from '../shared';
import { ExternalData } from '../initialization';

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
      debug('Problem with fetching products', action.payload);
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
