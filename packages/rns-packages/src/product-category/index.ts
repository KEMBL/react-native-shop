import { Module } from 'redux-package-loader/dist/types';

// first export what is required for package loader
import * as effects from './effects';
import * as actions from './actions';
import * as sagas from './sagas';
import reducers from './reducers';
import { selectors } from './selectors';

export const module: Module = {
  actions,
  effects,
  reducers,
  selectors,
  sagas
};

// rest required by other modules things
export * from './types';
export * from './actions';
export * from './selectors';
