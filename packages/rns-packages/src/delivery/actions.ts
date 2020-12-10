import { DeliveryInfo } from 'rns-types';

import { actionCreator } from 'rns-packages/src/shared';

/** Not UI related actons */

/**
 * Update delivery address
 */
const setSaveDeliveryAddressStart = actionCreator.start<DeliveryInfo>('SAVE_DELIVERY_ADDRESS');
export const actionSaveDeliveryAddress = { start: setSaveDeliveryAddressStart };
