import { debug as Debug } from '../debug';
import { fetchProducts } from './actions';
import { ProductModel, ProductsCollection } from './types';
import { FailedActionResult, nameofFactory } from '../shared';
import { ApplicationState } from '../..';

const debug = Debug('app:reducers:fetchCategory');

export interface FetchProductsDoneAction {
  type: string;
  payload: ProductsCollection;
}

interface FetchProductsFailAction {
  type: string;
  payload: FailedActionResult;
}

type ActionTypes = FetchProductsDoneAction | FetchProductsFailAction;

// const defaultExternalData: ExternalData =
// {
//   categories: [],
//   products: []
// };

const dataReducer = (state: ProductModel[] = [], action: ActionTypes): ProductModel[] => {
  debug('Reducer after fetching products:', action, state);

  switch (action.type) {
    case `${fetchProducts.done}`: {
      return (action.payload as ProductsCollection).products;
      // return { ...state, products };
    }

    case `${fetchProducts.fail}`: {
      debug('Problem with fetching products', action.payload);
      return state;
    }

    default:
      return state;
  }
};

const externalDataBranchName = 'products';
nameofFactory<ApplicationState>()(externalDataBranchName);

export default {
  // [externalDataBranchName]: dataReducer // TODO: use slice here
  [externalDataBranchName]: dataReducer // TODO: use slice here
};
