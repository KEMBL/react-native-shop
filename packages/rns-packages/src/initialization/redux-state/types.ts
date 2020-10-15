import { Store, AnyAction } from 'redux';

import { BootUpStatus } from '../../bootup';
import { ProductModel } from '../../product';
import { ProductCategoryModel } from '../../category';
import { UiState } from '../../ui';

/**
 * Application store type
 */
export type ApplicationStore = Store<ApplicationState, AnyAction>;

export interface ExternalData {
  categories: ProductCategoryModel[];
  products: ProductModel[];
}

/**
 * Main application state class
 */
export interface ApplicationState {
  bootUpStatus: BootUpStatus;
  uiState: UiState;
  externalData: ExternalData;
}
