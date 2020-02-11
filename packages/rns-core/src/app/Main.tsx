import React from 'react';

import ProductPage from './views/ProductPage';
import {ProductModel} from './models/Product/ProductModels';
import {useProductSelectors} from './services/redux/ducks/Products.duck';

interface MainProps {
  productsCustom: ProductModel[];
}

export const Main: React.FC<MainProps> = ({productsCustom}) => {
  const product = productsCustom[0];

  console.log(
    'Store product',
    useProductSelectors().productsSelector.toArray()
  );
  console.log('Prop product', product);

  return <ProductPage product={product} />;
};
