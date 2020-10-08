import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
//import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';

import { debug as Debug } from '../../debug';
import { ApplicationState, ApplicationStore } from './types';
import { rootReducer } from './root-objects';

const debug = Debug('app:store:error');
//const { Map } = Immutable;

/**
 * Build redux store
 */
export class StoreBuilder {
  get getStore(): ApplicationStore {
    return this.store;
  }
  private store: ApplicationStore;

  constructor(
    middleware?: Middleware[],
    enhancer?: (...funcs: StoreEnhancer[]) => StoreEnhancer,
    initState?: ApplicationState
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
