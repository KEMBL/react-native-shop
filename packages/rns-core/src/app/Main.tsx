import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';

import {NavigationStackParamList} from './models/navigation';
import ProductPage from './views/ProductPage';

export const MainScreen: React.FC = () => {
  type InitialLoadingScreenRouteProp = RouteProp<
    NavigationStackParamList,
    'MainScreen'
  >;

  const route = useRoute<InitialLoadingScreenRouteProp>();
  const {products} = route.params;

  const product = products?.[0];
  return product ? <ProductPage product={product} /> : <></>;
};
