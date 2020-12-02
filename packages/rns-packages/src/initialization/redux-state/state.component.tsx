import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { appBootup } from 'rns-packages/src/bootup';
import { ApplicationStore } from './types';
import { StoreBuilderService } from './store-builder.service';

interface ApplicationStateProps {
  store: ApplicationStore;
  children: React.ReactNode;
}

/**
 * High order component injects redux application store
 *
 * @param {object} props object component props
 *
 * @returns {object} react component
 */
export const ApplicationStateComponent: React.FC<ApplicationStateProps> = (props: ApplicationStateProps) => {
  const { store, children } = props;
  const persistor = StoreBuilderService.getPersistor;

  // Note: Dispatching to the store has to be done in a useEffect so that React
  // can sync the update with the render cycle otherwise it causes the message:
  // `Warning: Cannot update a component from inside the function body of a different component.`
  useEffect(() => {
    store.dispatch(appBootup.start());
  }, [store]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
