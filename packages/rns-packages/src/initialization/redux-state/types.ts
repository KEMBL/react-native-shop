import { Store, AnyAction } from 'redux';
import { BootUpProgressEnum, BootUpStatus } from 'bootup';
import { ExternalData } from 'product-category';
import { UiState } from 'ui';

/**
 * Application store type
 */
export type ApplicationStore = Store<ApplicationState, AnyAction>;

/**
 * Main application state class
 */
export class ApplicationState {
  bootUpStatus: BootUpStatus = { progress: BootUpProgressEnum.NoStarted };
  uiState: UiState = new UiState();
  externalData: ExternalData = new ExternalData();
}
