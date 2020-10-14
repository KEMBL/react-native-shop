import { takeEvery } from 'redux-saga/effects';

import { fetchProducts } from './actions';
import { onFetchProducts } from './effects';

/**
 * Saga takes category list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* fetchProductsSaga() {
  yield takeEvery(`${fetchProducts.start}`, onFetchProducts);
}

//export { fetchCategoriesWithProductSaga };
export { fetchProductsSaga };
