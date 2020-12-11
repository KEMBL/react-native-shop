import { DeliveryInfo, DeliveryPickupPointsCollectionResponse } from 'rns-types';

import { FailedActionResult } from 'rns-packages/src/shared/types';
import { actionCreator } from 'rns-packages/src/shared';

/** Not UI related actons */

/**
 * Update delivery address
 */
const setSaveDeliveryAddressStart = actionCreator.start<DeliveryInfo>('SAVE_DELIVERY_ADDRESS');
export const actionSaveDeliveryAddress = { start: setSaveDeliveryAddressStart };

/**
 * Requests exist product pickup points
 */
const actionName = 'FETCH_DELIVERY_PICKUP_POINTS';
const start = actionCreator.start(actionName);
const done = actionCreator.done<DeliveryPickupPointsCollectionResponse>(actionName);
const fail = actionCreator.fail<FailedActionResult>(actionName);

export const fetchDeliveryPickupPoints = { start, done, fail };
