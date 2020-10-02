import { put, call } from 'redux-saga/effects';
import Debug from 'debug';

import { CategoryId, fetchCategoriesWithProducts } from 'product-category';
import { appBootupComplete, appBootupCompleteFail } from './actions';
import { Action } from 'robodux';

/**
 * Action method called when the app boots up
 */

const debug = Debug('app:action:bootup');

/**
 * Action performs boot activities
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* onBootup(action: Action<CategoryId>) {
  debug('Perform action', action);
  const categoryId = action.payload!;
  try {
    yield put(fetchCategoriesWithProducts(categoryId)); // dispatch action
    yield put(appBootupComplete(categoryId));
  } catch (error) {
    yield call(debug, `Exception during the app bootup with category ${categoryId}`, error); // call function
    yield put(appBootupCompleteFail({ payload: categoryId, error }));
  }
}
