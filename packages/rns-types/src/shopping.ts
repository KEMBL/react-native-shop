import { ProductId } from './product';

/**
 * Information about one product in a shoppng list
 */
export interface ShoppingInfo {
  productId: ProductId;
  amount: number;
}
