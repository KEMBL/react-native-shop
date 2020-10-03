import { Module } from 'redux-package-loader/dist/types';

import * as effects from './effects';
import * as actions from './actions';
import * as sagas from './sagas';
import reducers from './reducers';

export * from './types';
export * from './actions';
export const module: Module = {
  actions,
  effects,
  reducers,
  sagas
};
