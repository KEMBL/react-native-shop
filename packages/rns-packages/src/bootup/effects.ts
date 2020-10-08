import { put, call } from 'redux-saga/effects';
import { ActionWithPayload } from 'robodux';

import { debug as Debug } from '../debug';
import { CategoryId, fetchCategoriesWithProducts } from '../product-category';
import { appBootupComplete, appBootupCompleteFail } from './actions';

/**
 * Action method called when the app boots up
 */

const debug = Debug('app:action:bootup');

export function* onBootup(action: ActionWithPayload<CategoryId>) {
  debug('Perform action', action);
  const categoryId = action.payload;
  try {
    yield put(fetchCategoriesWithProducts.start(categoryId)); // dispatch action
    yield put(appBootupComplete(categoryId));
  } catch (error) {
    yield call(debug, `Exception during the app bootup with category ${categoryId}`, error); // call function
    yield put(appBootupCompleteFail({ payload: categoryId, error }));
  }
}
