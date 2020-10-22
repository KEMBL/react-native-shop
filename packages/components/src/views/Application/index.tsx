import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { NavigationStackParamList } from 'rns-types';
import { isBootUpCompleted, isBootUpFailed, ui } from 'rns-packages';
import { ProductsListScreen } from 'components/src/views/ProductsListScreen';
import { InitialLoadingScreen } from 'components/src/views/InitialLoadingScreen';
import { ProductPage } from '../ProductPage';

/**
 * Application logic starts here
 * Here we make initial loading of necessary data right before start business logic
 *
 * @returns {React.FC} Component with the main application logic
 */
export const Application: React.FC = (): JSX.Element => {
  const isLoaded = useSelector(isBootUpCompleted);
  const isLoadingError = useSelector(isBootUpFailed);
  const currentProductId = useSelector(ui.selectCurrentProductId);
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
      {currentProductId === 0 && (
        <NavigationStack.Screen
          name="ProductsListScreen"
          component={ProductsListScreen}
          options={{ title: 'Main Screen' }}
          // initialParams={{ products: productsSelector.toArray() }}
        />
      )}
      {currentProductId !== 0 && (
        <NavigationStack.Screen name="ProductPage" component={ProductPage} options={{ title: 'Product Page' }} />
      )}
    </NavigationStack.Navigator>
  );
};
