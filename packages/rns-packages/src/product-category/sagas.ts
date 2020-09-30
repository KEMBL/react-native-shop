import { takeEvery } from 'redux-saga/effects';

import { fetchCategoriesWithProducts } from './actions';
import { onFetchCategoriesWithProducts } from './effects';

/**
 * Saga takes category list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* fetchCategoriesWithProductSaga() {
  yield takeEvery(`${fetchCategoriesWithProducts}`, onFetchCategoriesWithProducts);
}

//export { fetchCategoriesWithProductSaga };
export { fetchCategoriesWithProductSaga };
