import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { debug as Debug } from 'rns-packages/src/shared';
import { ApplicationState, ApplicationStore } from './types';
import { rootReducer, rootSaga } from './root-objects';

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

    middleware.push(sagaMiddleware);

    // logger
    // if (process.env.NODE_ENV === 'development') {
    //   const logger = require('redux-logger').createLogger({
    //     colors: false // does not work well in console
    //   });
    //   middleware.push(logger);
    // }

    const appledMiddleware = applyMiddleware(...middleware);
    const enhancedMiddleware = enhancer ? enhancer(appledMiddleware) : appledMiddleware;

    middleware = [...middleware, sagaMiddleware];
    this.store = createStore(rootReducer, initState, enhancedMiddleware);
    sagaMiddleware.run(rootSaga);
  }
}
