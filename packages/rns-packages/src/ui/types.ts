import { ProductId } from 'rns-types';
import { CategoryId } from '../category';

export class UiState {
  currentCategoryId: CategoryId = 0;
  currentProductId: ProductId = 0;
}
