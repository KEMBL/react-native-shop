import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { NavigationStackParamList } from 'rns-types';
import { isBootUpCompleted, isBootUpFailed, ui } from 'rns-packages';
import { ProductsListScreen } from 'components/src/views/ProductsListScreen';
import { InitialLoadingScreen } from 'components/src/views/InitialLoadingScreen';
import { ProductPage } from '../ProductPage';
import { DeliverySelectorScreen } from '../Delivery';

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
  const isDeliveryManagerOpened = useSelector(ui.selectIsDeliveryManagerOpened);
  const NavigationStack = createStackNavigator<NavigationStackParamList>();

  const [showLodingScreen, setShowLodingScreen] = useState(false);
  const [showProductsListScreen, setShowProductsListScreen] = useState(false);
  const [showProductScreen, setShowProductScreen] = useState(false);
  const [showDeliveryManagerScreen, setShowDeliveryManagerScreen] = useState(false);

  // TODO: #41 make normal hierarchical navigation
  if (!isLoaded || isLoadingError) {
    if (!showLodingScreen) {
      setShowLodingScreen(true);
      setShowProductsListScreen(false);
      setShowProductScreen(false);
      setShowDeliveryManagerScreen(false);
    }
  } else if (isDeliveryManagerOpened) {
    if (!showDeliveryManagerScreen) {
      setShowLodingScreen(false);
      setShowProductsListScreen(false);
      setShowProductScreen(false);
      setShowDeliveryManagerScreen(true);
    }
  } else if (currentProductId === 0) {
    if (!showProductsListScreen) {
      setShowLodingScreen(false);
      setShowProductsListScreen(true);
      setShowProductScreen(false);
      setShowDeliveryManagerScreen(false);
    }
  } else if (currentProductId !== 0) {
    if (!showProductScreen) {
      setShowLodingScreen(false);
      setShowProductsListScreen(false);
      setShowProductScreen(true);
      setShowDeliveryManagerScreen(false);
    }
  }

  return (
    <NavigationStack.Navigator headerMode="none">
      {showLodingScreen && (
        <NavigationStack.Screen
          name="Loading"
          component={InitialLoadingScreen}
          options={{ title: 'Loading...' }}
          initialParams={{ isError: isLoadingError }}
        />
      )}
      {showDeliveryManagerScreen && (
        <NavigationStack.Screen
          name="DeliveryManager"
          component={DeliverySelectorScreen}
          options={{ title: 'Manage the delivery' }}
        />
      )}

      {showProductsListScreen && (
        <NavigationStack.Screen
          name="ProductsListScreen"
          component={ProductsListScreen}
          options={{ title: 'Main Screen' }}
        />
      )}
      {showProductScreen && (
        <NavigationStack.Screen name="ProductPage" component={ProductPage} options={{ title: 'Product Page' }} />
      )}
    </NavigationStack.Navigator>
  );
};
