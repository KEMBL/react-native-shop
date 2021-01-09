import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, Persistor, persistReducer, createTransform } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import storage from '@react-native-async-storage/async-storage';

import { debug as Debug } from 'rns-packages/src/shared';
import { uiStateBranchName } from 'rns-packages/src/ui';
import { deliveryStateBranchName } from 'rns-packages/src/delivery';

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
      key: 'rns',
      storage,
      stateReconciler: autoMergeLevel1,
      // debug: true,
      version: 1,
      whitelist: [uiStateBranchName, deliveryStateBranchName],
      // Transform dates back into JS Dates on rehydrate
      // (see: https://github.com/rt2zz/redux-persist/issues/82)
      transforms: [
        createTransform(JSON.stringify, (toRehydrate) =>
          JSON.parse(toRehydrate, (key, value) =>
            typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value
          )
        )
      ]
    };

    const persistedReducer = persistReducer<ApplicationState>(
      persistConfig as any, // any because `transform in `persistConfig amkes value incompatible by type
      rootReducer
    );

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
