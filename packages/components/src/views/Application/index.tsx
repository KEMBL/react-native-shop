import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { translate } from 'localization';
import { NavigationStackParamList } from 'rns-types';
import { isBootUpCompleted, isBootUpFailed, ui } from 'rns-packages';
import { InitialLoadingScreen, ProductsListScreen } from 'components';

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

  let showLodingScreen = false;
  let showProductsListScreen = false;
  let showProductScreen = false;
  let showDeliveryManagerScreen = false;

  // TODO: #41 make normal hierarchical navigation or make somethig better than below
  if (!isLoaded || isLoadingError) {
    if (!showLodingScreen) {
      showLodingScreen = true;
      showProductsListScreen = false;
      showProductScreen = false;
      showDeliveryManagerScreen = false;
    }
  } else if (isDeliveryManagerOpened) {
    if (!showDeliveryManagerScreen) {
      showLodingScreen = false;
      showProductsListScreen = false;
      showProductScreen = false;
      showDeliveryManagerScreen = true;
    }
  } else if (currentProductId === 0) {
    if (!showProductsListScreen) {
      showLodingScreen = false;
      showProductsListScreen = true;
      showProductScreen = false;
      showDeliveryManagerScreen = false;
    }
  } else if (currentProductId !== 0) {
    if (!showProductScreen) {
      showLodingScreen = false;
      showProductsListScreen = false;
      showProductScreen = true;
      showDeliveryManagerScreen = false;
    }
  }

  return (
    <NavigationStack.Navigator headerMode="none">
      {showLodingScreen && (
        <NavigationStack.Screen
          name="Loading"
          component={InitialLoadingScreen}
          options={{ title: `${translate('Loading')}...` }}
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
          options={{ title: translate('Main Screen') }}
        />
      )}
      {showProductScreen && (
        <NavigationStack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{ title: translate('Product Page') }}
        />
      )}
    </NavigationStack.Navigator>
  );
};
