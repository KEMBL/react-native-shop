import { Module } from 'redux-package-loader/dist/types';

// first export what is required for package loader
import { selectors } from './selectors';
import * as actions from './actions';

export const module: Module = {
  actions,
  selectors
};

// rest required by other modules things
export * from './types';
export * from './selectors';
export * from './actions';
