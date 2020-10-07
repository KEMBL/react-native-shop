import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { NavigationStackParamList } from './app/models/navigation';
import { InitialLoadingScreen } from './app/views/InitialLoadingScreen';
import { isBootUpCompleted, isBootUpFailed } from 'rns-packages';
import { ProductsListScreen } from './app/views/ProductsListScreen';

/**
 * Application logic starts here
 * Here we make initial loading of necessary data right before start business logic
 *
 * @returns {React.FC} Component with the main application logic
 */
const App: React.FC = (): JSX.Element => {
  const isLoaded = useSelector(isBootUpCompleted);
  const isLoadingError = useSelector(isBootUpFailed);
  const NavigationStack = createStackNavigator<NavigationStackParamList>();

  return (
    <NavigationStack.Navigator headerMode="none">
      {(!isLoaded || isLoadingError) && (
        <NavigationStack.Screen
          name="Loading"
          component={InitialLoadingScreen}
          options={{ title: 'Loading...' }}
          initialParams={{ isError: isLoadingError }}
        />
      )}
      <NavigationStack.Screen
        name="ProductsListScreen"
        component={ProductsListScreen}
        options={{ title: 'Main Screen' }}
        // initialParams={{ products: productsSelector.toArray() }}
      />
      {/* <NavigationStack.Screen
        name="ProductPage"
        component={MainScreen}
        options={{title: 'Product Page'}}
        initialParams={{products: productsSelector.toArray()}}
      /> */}
    </NavigationStack.Navigator>
  );
};
export default App;
