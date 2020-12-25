import {
  DeliveryInfoAdd,
  DeliveryInfoUpdate,
  DeliveryPickupInfoUpdate,
  DeliveryPickupPointsCollectionResponse
} from 'rns-types';

import { FailedActionResult } from 'rns-packages/src/shared/types';
import { actionCreator } from 'rns-packages/src/shared';

/** Not UI related actons */

/**
 * Add a new delivery address
 */
const setAddDeliveryAddressStart = actionCreator.start<DeliveryInfoAdd>('ADD_DELIVERY_ADDRESS');
export const actionAddDeliveryAddress = { start: setAddDeliveryAddressStart };

/**
 * Update delivery address
 */
const setUpdateDeliveryAddressStart = actionCreator.start<DeliveryInfoUpdate>('UPDATE_DELIVERY_ADDRESS');
export const actionUpdateDeliveryAddress = { start: setUpdateDeliveryAddressStart };

/**
 * Update delivery pickup address
 */
const setUpdateDeliveryPickupAddressStart = actionCreator.start<DeliveryPickupInfoUpdate>(
  'UPDATE_DELIVERY_PICKUP_ADDRESS'
);
export const actionUpdateDeliveryPickupAddress = { start: setUpdateDeliveryPickupAddressStart };

/**
 * Requests exist product pickup points
 */
const actionName = 'FETCH_DELIVERY_PICKUP_POINTS';
const start = actionCreator.start(actionName);
const done = actionCreator.done<DeliveryPickupPointsCollectionResponse>(actionName);
const fail = actionCreator.fail<FailedActionResult>(actionName);

export const fetchDeliveryPickupPoints = { start, done, fail };
