import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Text} from 'react-native';

import {NavigationStackParamList} from './models/navigation';
import ProductPage from './views/ProductPage';

export const MainScreen: React.FC = () => {
  type InitialLoadingScreenRouteProp = RouteProp<
    NavigationStackParamList,
    'MainScreen'
  >;

  const route = useRoute<InitialLoadingScreenRouteProp>();
  const {products} = route.params;

  return products ? (
    <ProductPage product={products[0]} />
  ) : (
    <Text>Products are not defined</Text>
  );
};
