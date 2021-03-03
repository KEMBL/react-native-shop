import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { shopping } from 'rns-packages';

import { Button } from 'components/src/trivial/buttons/Button';
import { ShoppingCartIcon } from 'components/src/trivial/icons/ShoppingCart';

/**
 * Shows a shopping cart button
 */
export const ShoppingCartButton: React.FC = (): JSX.Element => {
  const procuctsCount = useSelector(shopping.selectors.selectShoppingCartProductsCount, shallowEqual);

  console.log('procuctsCount', procuctsCount);

  const onShoppingCardOpen = (): void => {
    console.log('onShoppingCardOpen pressed');
  };

  return (
    <Button onPress={onShoppingCardOpen}>
      <ShoppingCartIcon />
    </Button>
  );
};
