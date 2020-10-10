import { takeEvery } from 'redux-saga/effects';

import { debug as Debug } from '../debug';
import { appBootup } from './actions';
import { onBootup } from './effects';

/**
 * Saga for handling the application boot up needs
 */

const debug = Debug('app:saga:bootup');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* bootupSaga() {
  debug('Perform saga');
  yield takeEvery(`${appBootup}`, onBootup);
}
