import { put, call } from 'redux-saga/effects';
import Debug from 'debug';

import { CategoryId } from 'product-category';
import { fetchCategoriesWithProducts } from './actions';
import { setLoaderStart, setLoaderSuccess, setLoaderFail } from 'loading';
import { ActionWithPayload } from 'robodux';
import { gqlFetchCategoryWithProductsAsync } from './gqlFetch';
import { actionSetCurrentCategory } from 'ui';

const debug = Debug('app:action:fetchCategory');

/**
 * Action method called when the app boots up
 *
 * @param {object} action action with category Id as payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchCategoriesWithProducts(action: ActionWithPayload<CategoryId>) {
  debug('Perform action', action);
  const categoryId = action.payload;
  yield put(setLoaderStart());
  try {
    const categories = yield call(gqlFetchCategoryWithProductsAsync, categoryId);

    yield put(fetchCategoriesWithProducts.done(categories));
    yield put(actionSetCurrentCategory(categoryId));
    yield put(setLoaderSuccess());
  } catch (error) {
    yield put(fetchCategoriesWithProducts.fail({ payload: categoryId, error }));
    yield put(setLoaderFail());
  }
}

export { onFetchCategoriesWithProducts };
