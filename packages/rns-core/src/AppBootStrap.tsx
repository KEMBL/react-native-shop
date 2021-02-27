import React from 'react';
import { View } from 'react-native';

import { Platform } from 'rns-theme';
import { LocalizationService } from 'localization';
import { AppContext, AppContextProps, Application } from 'components';
import { ApplicationStateComponent, setApolloClient } from 'rns-packages';

import { StoreService, GraphqlService } from './services';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppBootStrapProps extends AppContextProps {}

/**
 * Platform independent logic starts here
 */

/**
 * Need to fix zero height in a web build
 */
const AppWebHeightFixer = (): JSX.Element => {
  return Platform.isWeb ? (
    <View style={{ height: 'inherit' }}>
      <Application />
    </View>
  ) : (
    <Application />
  );
};

export const AppBootStrap: React.FC<AppBootStrapProps> = (props: AppBootStrapProps) => {
  const store = StoreService.getStore;
  setApolloClient(GraphqlService.apolloClient);
  LocalizationService.init();
  return (
    <AppContext.Provider value={props}>
      <ApplicationStateComponent store={store}>
        <AppWebHeightFixer />
      </ApplicationStateComponent>
    </AppContext.Provider>
  );
};
