import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

import { debug as Debug } from 'rns-packages/src/shared';
import { uiStateBranchName } from 'rns-packages/src/ui';
import { ApplicationState, ApplicationStore } from './types';
import { rootReducer, rootSaga } from './root-objects';

const debug = Debug('app:store:error');

/**
 * Service builds redux store and persistor, then keeps them for further reusing
 */
class StoreBuilderService {
  private store!: ApplicationStore;
  private persistor!: Persistor;

  get getStore(): ApplicationStore {
    return this.store;
  }

  get getPersistor(): Persistor {
    return this.persistor;
  }

  buildStore = (
    middleware?: Middleware[],
    enhancer?: (...funcs: StoreEnhancer[]) => StoreEnhancer,
    initState?: ApplicationState
  ): ApplicationStore => {
    const persistConfig = {
      key: 'root',
      storage,
      version: 0,
      whitelist: [uiStateBranchName]
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

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
    this.store = createStore(
      persistedReducer,
      initState as any, // track https://github.com/rt2zz/redux-persist/pull/1170
      enhancedMiddleware
    );
    this.persistor = persistStore(this.store);

    sagaMiddleware.run(rootSaga);

    return this.store;
  };
}

const storeBuilderService = new StoreBuilderService();
export { storeBuilderService as StoreBuilderService };