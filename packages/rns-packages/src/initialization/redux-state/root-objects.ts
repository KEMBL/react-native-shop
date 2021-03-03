import { Reducer, combineReducers } from 'redux';
import use from 'redux-package-loader';
import sagaCreator from 'redux-saga-creator';

import { debug as Debug } from 'rns-packages/src/shared';
import { ApplicationState } from './types';

/**
 * Root redux objects configuration
 */
const debug = Debug('app:state');
const corePackages = [
  require('../../bootup/export'),
  require('../../configuration/export'),
  require('../../product/export'),
  require('../../category/export'),
  require('../../external-data/export'),
  require('../../ui/export'),
  require('../../delivery/export'),
  require('../../shopping/export')
];

const packages = use(corePackages);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>(packages.reducers!);

// optional: handle errors in sagas
const onError = (err: Error): void => {
  debug('Saga error', err);
};

// works similar to  more https://redux-saga.js.org/docs/advanced/RootSaga.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootSaga = sagaCreator(packages.sagas as any, onError);

export { packages, rootReducer, rootSaga };
