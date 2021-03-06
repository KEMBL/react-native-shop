import { Store, AnyAction } from 'redux';
import { ProductCategoryModel, ProductModel } from 'rns-types';

import { BootUpStatus, UiState, Configuration, DeliveryState } from 'rns-packages/src/shared/types';

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
  configuration: Configuration;
  bootUpStatus: BootUpStatus;
  uiState: UiState;
  externalData: ExternalData;
  delivery: DeliveryState;
}
