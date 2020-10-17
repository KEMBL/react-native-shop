import { Store, AnyAction } from 'redux';
import { ProductModel } from 'rns-types';

import { BootUpStatus, UiState, Configuration, ProductCategoryModel } from 'rns-packages/src/shared/types';

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
}
