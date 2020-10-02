import { put } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import Debug from 'debug';

import { CategoryId } from 'product-category';
import { fetchCategoriesWithProductsSuccess, fetchCategoriesWithProductsFail } from './actions';
import { setLoaderStart, setLoaderSuccess, setLoaderFail } from 'loading';
import { Action } from 'robodux';

const debug = Debug('app:action:fetchCategory');

/**
 * Action method called when the app boots up
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchCategoriesWithProducts(action: Action<CategoryId>) {
  debug('Perform action', action);
  const categoryId = action.payload!;
  yield put(setLoaderStart());
  try {
    yield put(GQLFETCH(categoryId));
  } catch (error) {
    yield put(fetchCategoriesWithProductsFail({ payload: categoryId, error }));
    yield put(setLoaderFail());
  }

  yield put(setLoaderSuccess());
  yield put(fetchCategoriesWithProductsSuccess(categoryId));

  // update sotre
  yield put(batchActions([updateCategories(categories), updateProducts(products)]));
}

export { onFetchCategoriesWithProducts };
