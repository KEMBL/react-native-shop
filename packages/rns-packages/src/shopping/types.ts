import { ShoppingInfo } from 'rns-types';

export class ShoppingState {
  /**
   * Products selected to buy
   */
  shoppingCartList: ShoppingInfo[] = [
    { productId: 696, amount: 1 },
    { productId: 3972, amount: 2 },
    { productId: 4028, amount: 3 }
  ];
}
