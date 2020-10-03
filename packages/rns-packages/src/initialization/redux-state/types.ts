import { Store, AnyAction } from 'redux';
import { BootUpProgressEnum, BootUpStatus } from 'bootup';
import { ExternalData } from 'product-category';

export type ApplicationStore = Store<ApplicationState, AnyAction>;

/**
 * Shared types
 */

export class ApplicationState {
  bootUpStatus: BootUpStatus = { progress: BootUpProgressEnum.NoStarted };
  externalData: ExternalData = new ExternalData();
}
