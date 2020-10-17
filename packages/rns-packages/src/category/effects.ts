import { put, call } from 'redux-saga/effects';
import { Action, ActionWithPayload } from 'robodux';

import { debug as Debug } from 'rns-packages/src/shared';
import { CategoryId } from 'rns-packages/src/shared/types';
import { actionSetCurrentCategory } from 'rns-packages/src/ui';
import { setLoaderStatus } from 'rns-packages/src/loading';
import { fetchCategories, fetchCategoriesWithProducts } from './actions';
import { gqlFetchAllCategorisAsync, gqlFetchCategoryWithProductsAsync } from './gqlFetch';

const debug = Debug('app:action:fetchCategories');

/**
 * Action effect method for fetchong all categories
 *
 * @param {object} action action without payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchAllCategories(action: Action) {
  yield put(setLoaderStatus.start());
  try {
    const categories = yield call(gqlFetchAllCategorisAsync);
    yield put(fetchCategories.done(categories));
    yield put(setLoaderStatus.done()); // TODO: might be to early to call
  } catch (error) {
    yield call(debug, `Exception: All categories fetch action`, error, action);
    yield put(fetchCategories.fail({ error }));
    yield put(setLoaderStatus.fail());
    throw error;
  }
}

/**
 * Action method called when the app boots up
 *
 * @param {object} action action with category Id as payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchCategoriesWithProducts(action: ActionWithPayload<CategoryId>) {
  const categoryId = action.payload;
  yield put(setLoaderStatus.start());
  try {
    const categories = yield call(gqlFetchCategoryWithProductsAsync, categoryId, true);
    yield put(fetchCategoriesWithProducts.done(categories));
    yield put(actionSetCurrentCategory.start(categoryId));
    yield put(setLoaderStatus.done()); // TODO: might be to early to call
  } catch (error) {
    yield call(debug, `Exception: Categories fetch action`, error, action);
    yield put(fetchCategoriesWithProducts.fail({ payload: categoryId, error }));
    yield put(setLoaderStatus.fail());
    throw error;
  }
}

export { onFetchAllCategories, onFetchCategoriesWithProducts };
