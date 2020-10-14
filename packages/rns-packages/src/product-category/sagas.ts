import { takeEvery } from 'redux-saga/effects';

import { debug as Debug } from '../debug';
import { fetchCategories, fetchCategoriesWithProducts } from './actions';
import { onFetchAllCategories, onFetchCategoriesWithProducts } from './effects';

const debug = Debug('app:saga:fetchCategories');

/**
 * Saga takes all categories list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* fetchAllCategoriesSaga() {
  debug(`${fetchCategories.start}`);
  yield takeEvery(`${fetchCategories.start}`, onFetchAllCategories);
}

/**
 * Saga takes category list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* fetchCategoriesWithProductSaga() {
  debug(`${fetchCategoriesWithProducts.start}`);
  yield takeEvery(`${fetchCategoriesWithProducts.start}`, onFetchCategoriesWithProducts);
}

//export { fetchCategoriesWithProductSaga };
export { fetchAllCategoriesSaga, fetchCategoriesWithProductSaga };
