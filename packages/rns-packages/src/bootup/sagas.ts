import { takeEvery } from 'redux-saga/effects';

import { appBootup } from './actions';
import { onBootup } from './effects';

/**
 * Saga for handling the application boot up needs
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function* bootupSaga() {
  yield takeEvery(`${appBootup.start}`, onBootup);
}
