import React from 'react';

import { Button } from 'components/src/trivial/buttons/Button';
import { ShoppingCartIcon } from 'components/src/trivial/icons/ShoppingCart';

/**
 * Shows a shopping cart button
 */
export const ShoppingCartButton: React.FC = (): JSX.Element => {
  const onShoppingCardOpen = (): void => {
    console.log('onShoppingCardOpen pressed');
  };

  return (
    <Button onPress={onShoppingCardOpen}>
      <ShoppingCartIcon />
    </Button>
  );
};
