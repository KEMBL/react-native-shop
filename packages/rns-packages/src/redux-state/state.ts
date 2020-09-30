// import { all } from 'redux-saga/effects';

import { combineReducers, Reducer } from 'redux';
import use from 'redux-package-loader';
import sagaCreator from 'redux-saga-creator';
import Debug from 'debug';

import { ApplicationState } from '../types';
import * as bootup from '../bootup';

/**
 * Root redux objects configuration
 */

const debug = Debug('app:state');
const corePackages = [bootup.module];

const packages = use(corePackages);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootReducer: Reducer<ApplicationState> = combineReducers(packages.reducers!);

// optional: handle errors in sagas
const onError = (err: Error): void => {
  debug('Track saga errors');
  debug(err);
};

// works similar to  more https://redux-saga.js.org/docs/advanced/RootSaga.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootSaga = sagaCreator(packages.sagas as any, onError);

// const rootSaga = function* rootSaga() {
//   yield all(packages.sagas!);
//   // code after all-effect
// };

export { packages, rootReducer, rootSaga };
