import { put, call } from 'redux-saga/effects';
import { Action } from 'robodux';

import { debug as Debug } from '../debug';
import { setLoaderStatus } from '../loading';
import { fetchProducts } from './actions';
import { gqlFetchAllProductsAsync } from './gqlFetch';

const debug = Debug('app:action:fetchProducts');

/**
 * Action effect method for fetchong all products
 *
 * @param {object} action action without payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* onFetchProducts(action: Action) {
  debug('Perform all products fetch action', action);
  yield put(setLoaderStatus.start());
  try {
    const products = yield call(gqlFetchAllProductsAsync);
    yield put(fetchProducts.done(products));
    yield put(setLoaderStatus.done()); // TODO: might be to early to call
  } catch (error) {
    yield put(fetchProducts.fail({ error }));
    yield put(setLoaderStatus.fail());
    throw error;
  }
}

export { onFetchProducts };
