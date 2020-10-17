import { put, call, select } from 'redux-saga/effects';

import { debug as Debug } from 'rns-packages/src/shared';
import { CategoryId } from 'rns-packages/src/shared/types';
import { fetchProducts } from 'rns-packages/src/product';
import { fetchCategories } from 'rns-packages/src/category';
import { selectCurrentCategoryId } from 'rns-packages/src/ui';
import { appBootup } from './actions';
/**
 * Action method called when the app boots up
 */

const debug = Debug('app:action:bootup');

/**
 * Action effect for application start
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* onBootup() {
  const categoryId: CategoryId = yield select(selectCurrentCategoryId); // tODO: remove noneeed!
  try {
    //yield put(fetchCategoriesWithProducts.start(categoryId)); // dispatch action
    yield put(fetchProducts.start());
    yield put(fetchCategories.start());
  } catch (error) {
    yield call(debug, `Exception during the app bootup with category ${categoryId}`, error);
    yield put(appBootup.fail({ payload: categoryId, error }));
  }
}
