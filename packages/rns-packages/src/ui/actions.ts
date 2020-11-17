import { DeliveryAddressId, ProductId } from 'rns-types';

import { CategoryId } from 'rns-packages/src/shared/types';
import { actionCreator } from 'rns-packages/src/shared';

/**
 * Sets selected in UI category
 */
const setCurrentCategoryStart = actionCreator.start<CategoryId>('SET_CURRENT_CATEGORY');
export const actionSetCurrentCategory = { start: setCurrentCategoryStart };

/**
 * Sets selected in UI product
 */
const setCurrentProductStart = actionCreator.start<ProductId>('SET_CURRENT_PRODUCT');
export const actionSetCurrentProduct = { start: setCurrentProductStart };

const setDeliveryManagerOpenedStart = actionCreator.start('OPEN_DELIVERY_MANAGER');
export const actionSetDeliveryManagerOpen = { start: setDeliveryManagerOpenedStart };

const setDeliveryManagerCloseStart = actionCreator.start('CLOSE_DELIVERY_MANAGER');
export const actionSetDeliveryManagerClose = { start: setDeliveryManagerCloseStart };

const setSetDeliveryAddressStart = actionCreator.start<DeliveryAddressId>('SET_DELIVERY_ADDRESS');
export const actionSetDeliveryAddress = { start: setSetDeliveryAddressStart };
