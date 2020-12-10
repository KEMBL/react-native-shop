import { CategoryId, DeliveryAddressId, ProductId } from 'rns-types';

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
/**
 * Ui related. Select delivery place card to modify
 */
export const actionSetDeliveryAddress = { start: setSetDeliveryAddressStart };

// const setAddDeliveryAddressOpenedStart = actionCreator.start('OPEN_ADD_DELIVERY_ADDRESS');
// /**
//  * Add delivery place card
//  */
// export const actionAddDeliveryAddressStart = { start: setAddDeliveryAddressOpenedStart };
