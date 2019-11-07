import {AnyAction, Reducer} from 'redux';
import {ProductModel} from '../../../models/Product/ProductModels';
import {ProductsState} from '../../../models/Product/ProductsState';

export const GET_PRODUCTS = 'app/products/LOAD';
export const GET_PRODUCTS_SUCCESS = 'app/products/LOAD_SUCCESS';
export const GET_PRODUCTS_FAIL = 'app/products/LOAD_FAIL';

interface GetProductsAction extends AnyAction {
  type: typeof GET_PRODUCTS;
  payload: {
    request: {
      url: string;
    };
  };
}

interface GetProductsSuccessAction extends AnyAction {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: ProductModel[];
}

interface GetProductsFailAction extends AnyAction {
  type: typeof GET_PRODUCTS_FAIL;
}

export type ProductsActionTypes =
  | GetProductsAction
  | GetProductsSuccessAction
  | GetProductsFailAction;

export const reducer: Reducer<ProductsState, ProductsActionTypes> = (
  state: ProductsState = new ProductsState(),
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return state
        .set('productsLoading', true)
        .set('productsLoadingError', undefined);
    case GET_PRODUCTS_SUCCESS:
      return state
        .set('products', action.payload)
        .set('productsLoading', false)
        .set('productsLoadingError', undefined);
    // {...state, loading: false, repos: action.payload.data};
    case GET_PRODUCTS_FAIL:
      return state
        .set(
          'productsLoadingError',
          'Error while fetching products, check connection!'
        )
        .set('productsLoading', false);
    default:
      return state;
  }
};

export const dispatchProductsRequest = () => {
  return {
    type: GET_PRODUCTS,
    payload: {
      // axios-middleware takes all actions with payload formatted as below and return <ActionName>_SUCCESS or _FAIL actions
      request: {
        url: `http://kembl.ru/rns/products.json`
      }
    }
  };
};

export {reducer as ProductStateReducer};
