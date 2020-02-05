import React from 'react';
import {Provider} from 'react-redux';

import App from './App';
import {StoreService} from './app/services/store/Store.service';

/**
 * Platform independent logic starts here
 */
const store = StoreService.getStore;
export const AppBootStrap: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
