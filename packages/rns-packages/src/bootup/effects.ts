import { put, call, select } from 'redux-saga/effects';
import { ActionWithPayload } from 'robodux';

import { debug as Debug } from '../debug';
import { CategoryId, fetchCategoriesWithProducts } from '../product-category';
import { selectCurrentCategoryId } from '../ui';
import { appBootup } from './actions';

/**
 * Action method called when the app boots up
 */

const debug = Debug('app:action:bootup');

export function* onBootup(action: ActionWithPayload<CategoryId>) {
  debug('Perform action', action);
  const categoryId: CategoryId = yield select(selectCurrentCategoryId);
  try {
    yield put(fetchCategoriesWithProducts.start(categoryId)); // dispatch action
    yield put(appBootup.done());
  } catch (error) {
    yield call(debug, `Exception during the app bootup with category ${categoryId}`, error); // call function
    yield put(appBootup.fail({ payload: categoryId, error }));
  }
}
