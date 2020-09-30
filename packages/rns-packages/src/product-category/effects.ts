import { put } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';

import { RootCategoryId } from 'product-category';
import {
  fetchCategoriesWithProducts,
  fetchCategoriesWithProductsSuccess,
  fetchCategoriesWithProductsFail
} from './actions';
import { setLoaderStart, setLoaderSuccess } from 'loading';

/**
 * Action method called when the app boots up
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchCategoriesWithProducts() {
  yield put(setLoaderStart());
  yield put(fetchCategoriesWithProducts(RootCategoryId));
  yield put(setLoaderSuccess());

  yield put(batchActions([updateCategories(categories), updateProducts(products)]));
}

export { onFetchCategoriesWithProducts };
