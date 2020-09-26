import { put } from 'redux-saga/effects';

import { fetchCategoriesWithProducts, RootCategoryId } from 'product-category';
import { appBootupComplete } from './actions';

/**
 * Action method called when app boots up
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onBootup() {
  yield put(fetchCategoriesWithProducts(RootCategoryId));
  yield put(appBootupComplete());
}

export { onBootup };
