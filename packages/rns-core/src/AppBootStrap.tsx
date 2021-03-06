import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const NavigationStack = createStackNavigator();
const getNavigationContainer = (): JSX.Element => {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator headerMode="none">
        <NavigationStack.Screen name="Application" component={Application} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

export const AppBootStrap: React.FC<AppBootStrapProps> = (props: AppBootStrapProps) => {
  const store = StoreService.getStore;
  setApolloClient(GraphqlService.apolloClient);
  LocalizationService.init();
  return (
    <AppContext.Provider value={props}>
      <ApplicationStateComponent store={store}>
        {Platform.isWeb ? (
          // solves zero height in a web build
          <View style={{ height: 'inherit' }}>{getNavigationContainer()}</View>
        ) : (
          getNavigationContainer()
        )}
      </ApplicationStateComponent>
    </AppContext.Provider>
  );
};
