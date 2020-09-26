import { AnyAction, Reducer } from 'redux';
import { useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import { Set as ImmSet } from 'immutable';
import { AxiosResponse } from 'axios';

import configuationService from '../../ConfigurationService';
import { ProductModel, ProductLoadingState } from '../../../models/Product/ProductModels';
import { ProductsState } from '../../../models/Product/ProductsState';
import { ApplicationState } from '../../../models/Application/ApplicationState';

export const GET_PRODUCTS = 'app/products/LOAD';
export const GET_PRODUCTS_SUCCESS = 'app/products/LOAD_SUCCESS';
export const GET_PRODUCTS_FAIL = 'app/products/LOAD_FAIL';

interface ProductsResponse {
  products: ProductModel[];
}

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
  payload: AxiosResponse<ProductsResponse>;
}

interface GetProductsFailAction extends AnyAction {
  type: typeof GET_PRODUCTS_FAIL;
}

export type ProductsActionTypes = GetProductsAction | GetProductsSuccessAction | GetProductsFailAction;

export interface ProductSelectorsHookResult {
  productsSelector: ImmSet<ProductModel>;
  productLoadingStateSelector: ProductLoadingState;
}

export type ProductSelectorsHook = () => ProductSelectorsHookResult;

const loadingStateSelector = (state: ApplicationState): boolean => {
  return state.productsState.productsLoading;
};

const loadingErrorSelector = (state: ApplicationState): boolean => {
  return state.productsState.productsLoadingError !== undefined;
};

const stateProductsSelector = (state: ApplicationState): ImmSet<ProductModel> => {
  return state.productsState.products;
};

/**
 * Returns current product loading state
 */
const selectLoadingState = createSelector(
  loadingStateSelector,
  loadingErrorSelector,
  (isLoading: boolean, isEror: boolean) => {
    if (isEror) {
      return ProductLoadingState.error;
    }

    if (isLoading) {
      return ProductLoadingState.isLoading;
    }

    return ProductLoadingState.success;
  }
);

export const useProductSelectors: ProductSelectorsHook = () => {
  const productLoadingStateSelector = useSelector(selectLoadingState);
  const productsSelector = useSelector(stateProductsSelector, shallowEqual);
  return { productsSelector, productLoadingStateSelector };
};

export const reducer: Reducer<ProductsState, ProductsActionTypes> = (
  state: ProductsState = new ProductsState(),
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return state.set('productsLoading', true).set('productsLoadingError', undefined);
    case GET_PRODUCTS_SUCCESS:
      if (action.payload.data && Array.isArray(action.payload.data.products)) {
        return state.merge({
          products: ImmSet(action.payload.data.products),
          // products: ImmSet(new Array<ProductModel>()),
          productsLoading: false,
          productsLoadingError: undefined
        });
      }

      return state.merge({
        productsLoading: false,
        productsLoadingError: 'Error while unpacking products!'
      });

    case GET_PRODUCTS_FAIL:
      return state
        .set('productsLoadingError', 'Error while fetching products, check connection!')
        .set('productsLoading', false);
    default:
      return state;
  }
};

export const actionProductsRequest = (): GetProductsAction => {
  return {
    type: GET_PRODUCTS,
    payload: {
      // axios-middleware takes all actions with payload formatted as below and return <ActionName>_SUCCESS or _FAIL actions
      request: {
        url: configuationService.getProductsUrl
      }
    }
  };
};

export { reducer as ProductStateReducer };
