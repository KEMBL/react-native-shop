import { put, call } from 'redux-saga/effects';
import { Action } from 'robodux';

import { debug as Debug } from 'rns-packages/src/shared';
import { setLoaderStatus } from 'rns-packages/src/loading';
import { fetchDeliveryInformation } from './actions';
import { gqlFetchDeliveryPickupPointsAsync } from './gqlFetch';

const debug = Debug('app:action:fetchDelivery');

/**
 * Action effect method for fetching delivery related information
 *
 * @param {object} action action without payload
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function* onFetchDeliveryInformation(action: Action) {
  yield put(setLoaderStatus.start());
  try {
    const response = yield call(gqlFetchDeliveryPickupPointsAsync);
    yield put(fetchDeliveryInformation.done(response));
    yield put(setLoaderStatus.done()); // TODO: might be to early to call
  } catch (error) {
    yield call(debug, `Exception: Delivery information fetch action`, error, action);
    yield put(fetchDeliveryInformation.fail({ error }));
    yield put(setLoaderStatus.fail());
    throw error;
  }
}

export { onFetchDeliveryInformation };
