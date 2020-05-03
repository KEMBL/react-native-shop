import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, View} from 'react-native';

import {StylableText} from 'components/src/trivial/text/StylableText';
import { ImageCacherOptionsInterface } from 'components/src/trivial/CacheableImage/ImageCacherOptionsInterface';

import App from './App';
import {StoreService} from './app/services/store/Store.service';
import {Platform} from 'rns-theme/src/theme/Platform';


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
      return (
        <StylableText>
          No Image viewer assigned: {!!_} {!!__}
        </StylableText>
      );
    })
});

const NavigationStack = createStackNavigator();
const getNavigationContainer = (): JSX.Element => {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator headerMode="none">
        <NavigationStack.Screen name="Application" component={App} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

const store = StoreService.getStore;
export const AppBootStrap: React.FC<AppBootStrapProps> = (
  props: AppBootStrapProps
) => {
  return (
    <AppContext.Provider value={props}>
      <Provider store={store}>
        {Platform.isWeb ? (
        // solves zero height in a web build
          <View style={{height: Platform.deviceHeight}}>
            {getNavigationContainer()}
          </View>
        ) : (
          getNavigationContainer()
        )}
      </Provider>
    </AppContext.Provider>
  );
};
