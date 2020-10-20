import { takeEvery } from 'redux-saga/effects';

import { fetchCategories, fetchCategoriesWithProducts } from './actions';
import { onFetchAllCategories, onFetchCategoriesWithProducts } from './effects';

/**
 * Saga takes all categories list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function* fetchAllCategoriesSaga() {
  yield takeEvery(`${fetchCategories.start}`, onFetchAllCategories);
}

/**
 * Saga takes category list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function* fetchCategoriesWithProductSaga() {
  yield takeEvery(`${fetchCategoriesWithProducts.start}`, onFetchCategoriesWithProducts);
}

export { fetchAllCategoriesSaga, fetchCategoriesWithProductSaga };
