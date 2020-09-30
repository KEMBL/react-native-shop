import { put, call } from 'redux-saga/effects';
import Debug from 'debug';

import { fetchCategoriesWithProducts, RootCategoryId } from 'product-category';
import { appBootupComplete, appBootupCompleteFail } from './actions';

/**
 * Action method called when the app boots up
 */

const debug = Debug('app:bootup');

/**
 * Action performs boot activities
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* onBootup() {
  try {
    yield put(fetchCategoriesWithProducts(RootCategoryId)); // dispatch action
    yield put(appBootupComplete());
  } catch (error) {
    yield call(debug, 'Exception during the app bootup', error); // call function
    yield put(appBootupCompleteFail(error));
  }
}
