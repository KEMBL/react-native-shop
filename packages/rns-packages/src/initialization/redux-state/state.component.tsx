import React from 'react';
import { Provider } from 'react-redux';

import { appBootup } from '../../bootup';
import { ApplicationStore } from './types';

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

  store.dispatch(appBootup.start());

  return <Provider store={store}>{children}</Provider>;
};
