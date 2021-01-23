import { takeEvery } from 'redux-saga/effects';

import { fetchDeliveryInformation } from './actions';
import { onFetchDeliveryInformation } from './effects';

/**
 * Saga serves request to backend API for fetching delivery related information
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
function* fetchDeliveryInformationSaga() {
  yield takeEvery(`${fetchDeliveryInformation.start}`, onFetchDeliveryInformation);
}

export { fetchDeliveryInformationSaga };
