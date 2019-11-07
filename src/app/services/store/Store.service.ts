import {createStore, Store, AnyAction, applyMiddleware} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from '../redux/ducks';
import {ApplicationStateInterface} from '../../models/Application/ApplicationState';

class StoreService {

  get getStore() {
    return this.store;
  }
  private store: Store<ApplicationStateInterface, AnyAction>;

  constructor() {
    const client = axios.create({
      baseURL: 'http://kembl.ru',
      responseType: 'json'
    });

    this.store = createStore(
      rootReducer,
      applyMiddleware(axiosMiddleware(client))
    );
    console.log(this.store.getState());
  }
}

const storeService = new StoreService();
export {storeService as StoreService};
