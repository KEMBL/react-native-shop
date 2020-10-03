import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Debug from 'debug';

import { ApplicationState, ApplicationStore } from './types';
import { rootReducer } from './root-objects';

const debug = Debug('app:store:error');

/**
 * Build redux store
 */
export class StoreBuilder {
  get getStore(): ApplicationStore {
    return this.store;
  }
  private store: ApplicationStore;

  constructor(
    initState: ApplicationState,
    middleware?: Middleware[],
    enhancer?: (...funcs: StoreEnhancer[]) => StoreEnhancer
  ) {
    if (!middleware) {
      middleware = [];
    }

    const sagaMiddleware = createSagaMiddleware({
      onError: debug
    });

    const appledMiddleware = applyMiddleware(...middleware);
    const enhancedMiddleware = enhancer ? enhancer(appledMiddleware) : appledMiddleware;

    middleware = [...middleware, sagaMiddleware];
    this.store = createStore(rootReducer, initState, enhancedMiddleware);
  }
}
