import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { LoadingScreen } from 'components/src/views/LoadingScreen';
import { ProductsListScreen } from 'components/src/views/ProductsListScreen';
import { ProductPage } from 'components/src/views/ProductPage';
import { DeliverySelectorScreen } from 'components/src/views/Delivery';

/**
 * Navigation. The navigation flowchart is in /docs folder
 *
 * @returns {React.FC} Component with the  application navigation
 */
export const Navigation: React.FC = (): JSX.Element => {
  const RootStack = createStackNavigator();
  const MainStack = createStackNavigator();
  const ProductsStack = createStackNavigator();

  const productStackScreen = (): JSX.Element => {
    return (
      <ProductsStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <ProductsStack.Screen name="ProductsList" component={ProductsListScreen} />
        <ProductsStack.Screen name="ProductPage" component={ProductPage} />
      </ProductsStack.Navigator>
    );
  };

  const mainStackScreen = (): JSX.Element => {
    return (
      <MainStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <MainStack.Screen name="Products" component={productStackScreen} />
        <MainStack.Screen name="DeliveryManager" component={DeliverySelectorScreen} />
      </MainStack.Navigator>
    );
  };

  const rootStackScreen = (): JSX.Element => {
    return (
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          headerShown: false
        }}>
        <RootStack.Screen name="Loading" component={LoadingScreen} />
        <RootStack.Screen name="Main" component={mainStackScreen} />
      </RootStack.Navigator>
    );
  };

  return <NavigationContainer>{rootStackScreen()}</NavigationContainer>;
};
