import { Middleware } from 'redux';
// does not work, more: https://github.com/zalmoxisus/remote-redux-devtools/issues/68
//import { composeWithDevTools } from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApplicationStore, StoreBuilder } from 'rns-packages';

// import { ConfiguationService } from '../../../services';

class StoreService {
  get getStore(): ApplicationStore {
    return this.store;
  }
  private store: ApplicationStore;

  constructor() {
    // const {
    //   //remoteDevServerHostname,
    //   // remoteDevServerPort,
    //   // remoteDevServerActive,
    // //  allowRealtimeDebug
    // } = ConfiguationService;

    const middleware: Middleware[] = [];

    const composeEnhancers = composeWithDevTools({
      name: 'rns-application'
      //          realtime: true, //allowRealtimeDebug,
      //  hostname: remoteDevServerHostname,
      //port: 8081 //remoteDevServerPort
    });

    const builder = new StoreBuilder(middleware, composeEnhancers);
    this.store = builder.getStore;
  }
}

const storeService = new StoreService();
export { storeService as StoreService };
