import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from 'react-native';

import { NavigationStackParamList } from 'rns-types';
import { ProductPage } from 'components';

/**
 * This screen is just a temporary bridge to another view which is requred to test
 *
 * @returns {object} React function component
 *
 */
export const MainScreen: React.FC = () => {
  type InitialLoadingScreenRouteProp = RouteProp<NavigationStackParamList, 'ProductPage'>;

  const route = useRoute<InitialLoadingScreenRouteProp>();
  const { products } = route.params;

  return products ? <ProductPage product={products[0]} /> : <Text>Products are not defined</Text>;
};
