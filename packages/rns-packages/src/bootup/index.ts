import { Module } from 'redux-package-loader/dist/types';

import * as effects from './effects';
import * as actions from './actions';
import * as sagas from './sagas';
import * as selectors from './selectors';
import reducers from './reducers';

export * from './types';
export * from './actions';
export const module: Module = {
  actions,
  effects,
  selectors,
  reducers,
  sagas
};
