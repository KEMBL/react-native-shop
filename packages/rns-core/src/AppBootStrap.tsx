import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';

import {StylableText} from 'components/src/trivial/text/StylableText';

import App from './App';
import {StoreService} from './app/services/store/Store.service';

export interface ImageCacherOptionsInterface {
  validProtocols: string[];
  fileHostWhitelist: string[];
  cachePruneTriggerLimit: number;
  fileDirName: string | null;
  defaultPlaceholder: string | null;
}

export interface AppBootStrapProps {
  imageCacherInterface: (
    image: Image,
    options: ImageCacherOptionsInterface
  ) => React.Component;
}

/**
 * Platform independent logic starts here
 */
export const AppContext = React.createContext<AppBootStrapProps>({
  imageCacherInterface: (_: Image, __: ImageCacherOptionsInterface) =>
    new React.Component(() => {
      return <StylableText>No Image viewer assigned</StylableText>;
    })
});

const NavigationStack = createStackNavigator();
const store = StoreService.getStore;
export const AppBootStrap: React.FC<AppBootStrapProps> = (
  props: AppBootStrapProps
) => {
  return (
    <AppContext.Provider value={props}>
      <Provider store={store}>
        <NavigationContainer>
          <NavigationStack.Navigator headerMode="none">
            <NavigationStack.Screen name="Application" component={App} />
          </NavigationStack.Navigator>
        </NavigationContainer>
      </Provider>
    </AppContext.Provider>
  );
};
