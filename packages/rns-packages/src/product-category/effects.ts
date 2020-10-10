import { put, call } from 'redux-saga/effects';
import { ActionWithPayload } from 'robodux';

import { debug as Debug } from '../debug';
import { CategoryId } from '../product-category';
import { actionSetCurrentCategory } from '../ui';
import { setLoaderStatus } from '../loading';
import { fetchCategoriesWithProducts } from './actions';
import { gqlFetchCategoryWithProductsAsync } from './gqlFetch';

const debug = Debug('app:action:fetchCategory');

/**
 * Action method called when the app boots up
 *
 * @param {object} action action with category Id as payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchCategoriesWithProducts(action: ActionWithPayload<CategoryId>) {
  debug('Perform fetch action', action);
  const categoryId = action.payload;
  yield put(setLoaderStatus.start());
  try {
    const categories = yield call(gqlFetchCategoryWithProductsAsync, categoryId, true);
    yield put(fetchCategoriesWithProducts.done(categories));
    yield put(actionSetCurrentCategory.start(categoryId));
    yield put(setLoaderStatus.done());
  } catch (error) {
    yield put(fetchCategoriesWithProducts.fail({ payload: categoryId, error }));
    yield put(setLoaderStatus.fail());
    throw error;
  }
}

export { onFetchCategoriesWithProducts };
