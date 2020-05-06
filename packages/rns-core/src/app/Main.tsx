import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Text} from 'react-native';

import {NavigationStackParamList} from './models/navigation';
import ProductPage from './views/ProductPage';

/**
 * This screen is just a temporary bridge to another view which is requred to test
 */
export const MainScreen: React.FC = () => {
  type InitialLoadingScreenRouteProp = RouteProp<
  NavigationStackParamList,
  'ProductPage'
  >;

  const route = useRoute<InitialLoadingScreenRouteProp>();
  const {products} = route.params;

  return products ? (
    <ProductPage product={products[0]} />
  ) : (
    <Text>Products are not defined</Text>
  );
};
