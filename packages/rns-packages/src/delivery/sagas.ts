import { takeEvery } from 'redux-saga/effects';

import { fetchDeliveryPickupPoints } from './actions';
import { onFetchDeliveryPickupPoints } from './effects';

/**
 * Saga takes all categories list from the backend
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function* fetchDeliveryPickupPointsSaga() {
  yield takeEvery(`${fetchDeliveryPickupPoints.start}`, onFetchDeliveryPickupPoints);
}

export { fetchDeliveryPickupPointsSaga };
