import { ApplicationState } from 'rns-packages/src/shared/types';

const selectShoppingCartProductsCount = (state: ApplicationState): number => {
  return state.shopping.shoppingCartList.length;
};

export const selectors = {
  selectShoppingCartProductsCount
};
