import {
  DeliveryInfoAdd,
  DeliveryInfoUpdate,
  DeliveryDefaultAddressUpdate,
  DeliveryInformationResponse,
  DeliveryAddressId
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
 * Update default delivery address by id
 */
const setDefaultDeliveryAddressStart = actionCreator.start<DeliveryDefaultAddressUpdate>(
  'UPDATE_DELIVERY_DEFAULT_ADDRESS'
);
export const actionSetDefaultDeliveryAddress = { start: setDefaultDeliveryAddressStart };

/**
 * Remove selected delivery addresses
 */
const setDeleteDeliveryAddressesStart = actionCreator.start<DeliveryAddressId[]>('DELETE_DELIVERY_ADDRESSES');
export const actionDeleteDeliveryAddresses = { start: setDeleteDeliveryAddressesStart };

/**
 * Requests exist product pickup points, delivery cost, etc.
 */
const actionName = 'FETCH_DELIVERY_INFORMATION';
const start = actionCreator.start(actionName);
const done = actionCreator.done<DeliveryInformationResponse>(actionName);
const fail = actionCreator.fail<FailedActionResult>(actionName);

export const fetchDeliveryInformation = { start, done, fail };
