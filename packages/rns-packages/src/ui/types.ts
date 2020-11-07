import { ProductId } from 'rns-types';
import { CategoryId } from 'rns-packages/src/shared/types';

export class UiState {
  currentCategoryId: CategoryId = 0;
  currentProductId: ProductId = 0;
  isDeliveryManagerOpened = false;
}
