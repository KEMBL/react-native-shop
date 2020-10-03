import { takeEvery } from 'redux-saga/effects';
import Debug from 'debug';

import { fetchCategoriesWithProducts } from './actions';
import { onFetchCategoriesWithProducts } from './effects';

const debug = Debug('app:saga:fetchCategory');

/**
 * Saga takes category list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* fetchCategoriesWithProductSaga() {
  debug(`${fetchCategoriesWithProducts.start}`);
  yield takeEvery(`${fetchCategoriesWithProducts.start}`, onFetchCategoriesWithProducts);
}

//export { fetchCategoriesWithProductSaga };
export { fetchCategoriesWithProductSaga };
