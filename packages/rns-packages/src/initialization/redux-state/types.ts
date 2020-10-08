import { Store, AnyAction } from 'redux';

import { BootUpStatus } from '../../bootup';
import { ExternalData } from '../../product-category';
import { UiState } from '../../ui';

/**
 * Application store type
 */
export type ApplicationStore = Store<ApplicationState, AnyAction>;

/**
 * Main application state class
 */
export interface ApplicationState {
  bootUpStatus: BootUpStatus;
  uiState: UiState;
  externalData: ExternalData;
}
