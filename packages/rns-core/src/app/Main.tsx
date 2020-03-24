import React from 'react';

import ProductPage from './views/ProductPage';
import {ProductModel} from './models/Product/ProductModels';

interface MainProps {
  productsCustom: ProductModel[];
}

export const Main: React.FC<MainProps> = ({productsCustom}) => {
  const product = productsCustom[0];
  return <ProductPage product={product} />;
};
