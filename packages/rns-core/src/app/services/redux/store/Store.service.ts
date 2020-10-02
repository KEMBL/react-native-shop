import { Middleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import { ApplicationState, ApplicationStore, StoreBuilder } from 'rns-packages';

import { ConfiguationService } from 'app/services';

class StoreService {
  get getStore(): ApplicationStore {
    return this.store;
  }
  private store: ApplicationStore;

  constructor() {
    const { remoteDevServerHostname, remoteDevServerPort, remoteDevServerActive } = ConfiguationService;

    const middleware: Middleware[] = [];

    const composeEnhancers = !remoteDevServerActive
      ? undefined
      : composeWithDevTools({
          realtime: true,
          hostname: remoteDevServerHostname,
          port: remoteDevServerPort
        });

    const defaultState = new ApplicationState();
    const builder = new StoreBuilder(defaultState, middleware, composeEnhancers);
    this.store = builder.getStore;
  }
}

const storeService = new StoreService();
export { storeService as StoreService };
