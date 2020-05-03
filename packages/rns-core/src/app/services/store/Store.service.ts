import {createStore, Store, AnyAction, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import configuationService from '../ConfigurationService';
import rootReducer from '../redux/ducks';
import {ApplicationStateInterface} from '../../models/Application/ApplicationState';

class StoreService {
  get getStore(): Store<ApplicationStateInterface, AnyAction> {
    return this.store;
  }
  private store: Store<ApplicationStateInterface, AnyAction>;

  constructor() {
    const {
      baseURL,
      remoteDevServerHostname,
      remoteDevServerPort
    } = configuationService;
    const client = axios.create({
      baseURL,
      responseType: 'json'
    });

    const middleware = [axiosMiddleware(client)];

    const composeEnhancers = composeWithDevTools({
      realtime: true,
      hostname: remoteDevServerHostname,
      port: remoteDevServerPort
    });
    this.store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(...middleware))
    );
  }
}

const storeService = new StoreService();
export {storeService as StoreService};
