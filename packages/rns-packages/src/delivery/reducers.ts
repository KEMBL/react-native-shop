import {
  DeliveryInfo,
  DeliveryInfoAdd,
  DeliveryInfoUpdate,
  DeliveryPickupInfoUpdate,
  DeliveryPickupPointsCollectionResponse,
  DeliveryType
} from 'rns-types';

import { ApplicationState, FailedActionResult } from 'rns-packages/src/shared/types';
import { nameofFactory, newUuid, debug as Debug } from 'rns-packages/src/shared';

import { DeliveryState } from './types';
import {
  actionAddDeliveryAddress,
  actionUpdateDeliveryAddress,
  actionUpdateDeliveryPickupAddress,
  fetchDeliveryPickupPoints
} from './actions';

const debug = Debug('app:reducer:delivery');

interface AddDeliveryAddress {
  type: string;
  payload: DeliveryInfoAdd;
}

interface UpdateDeliveryAddress {
  type: string;
  payload: DeliveryInfoUpdate;
}

interface UpdateDeliveryPickupAddress {
  type: string;
  payload: DeliveryPickupInfoUpdate;
}

export interface FetchDeliveryPickupPointsDoneAction {
  type: string;
  payload: DeliveryPickupPointsCollectionResponse;
}

export interface FetchDeliveryPickupPointsFailAction {
  type: string;
  payload: FailedActionResult;
}

const DeliveryInfoFromDeliveryInfoAdd = (newAddress: DeliveryInfoAdd): DeliveryInfo => {
  return { ...newAddress, deliveryAddressId: newUuid(), deliveryType: DeliveryType.delivery, lastUsedAt: new Date() };
};

const DeliveryInfoUpdate = (oldAddress: DeliveryInfo, newAddress: DeliveryInfoUpdate): void => {
  oldAddress.clientName = newAddress.clientName;
  oldAddress.phoneNumber = newAddress.phoneNumber;
  oldAddress.address1 = newAddress.address1;
  oldAddress.address2 = newAddress.address2;
  oldAddress.note = newAddress.note;
};

const DeliveryInfoUpdateBaseAddress = (
  state: DeliveryState,
  addressId: string,
  deliveryType: DeliveryType,
  isBaseAddress: boolean
): DeliveryState => {
  const address =
    deliveryType === DeliveryType.delivery
      ? state.deliveryInfoList.find((a) => a.deliveryAddressId === addressId)
      : state.pickupInfoList.find((a) => a.deliveryAddressId === addressId);

  if (!address) {
    debug('Cannot find delivery address by id', addressId, deliveryType);
    return state;
  }

  const makeNotBase = (d: DeliveryInfo): void => {
    if (d.isBaseAddress) d.isBaseAddress = false;
  };
  state.pickupInfoList.forEach((d) => makeNotBase(d));
  state.deliveryInfoList.forEach((d) => makeNotBase(d));

  if (isBaseAddress) {
    address.isBaseAddress = true;
    address.lastUsedAt = new Date();
  }
  debug('Set delivery address as base', addressId);
  // changed state should be remade as new object othrvice redux-persist will not save it to storage
  return { pickupInfoList: state.pickupInfoList, deliveryInfoList: state.deliveryInfoList };
};

type DeliveryActionTypes = AddDeliveryAddress | UpdateDeliveryAddress | UpdateDeliveryPickupAddress;
type FetchActionTypes = FetchDeliveryPickupPointsDoneAction | FetchDeliveryPickupPointsFailAction;

const dataReducer = (
  state: DeliveryState = new DeliveryState(),
  action: DeliveryActionTypes | FetchActionTypes
): DeliveryState => {
  const state2 = deliveryReducer(state, action as DeliveryActionTypes);
  const state3 = fetchReducer(state2, action as FetchActionTypes);
  return state3;
};

/**
 * Reducer for internal delivery data updates
 */
const deliveryReducer = (state: DeliveryState = new DeliveryState(), action: DeliveryActionTypes): DeliveryState => {
  switch (action.type) {
    case `${actionAddDeliveryAddress.start}`: {
      const myAction = action as AddDeliveryAddress;
      const address = myAction.payload;
      const newAddress = DeliveryInfoFromDeliveryInfoAdd(address);
      const newDeliveryInfoList: DeliveryInfo[] = [...state.deliveryInfoList, newAddress];
      let newState = { ...state, deliveryInfoList: newDeliveryInfoList };
      newState = DeliveryInfoUpdateBaseAddress(
        newState,
        newAddress.deliveryAddressId,
        newAddress.deliveryType,
        newAddress.isBaseAddress
      );
      return newState;
    }

    case `${actionUpdateDeliveryAddress.start}`: {
      const myAction = action as UpdateDeliveryAddress;
      const updatedAddress = myAction.payload;

      const address = state.deliveryInfoList.find((a) => a.deliveryAddressId === updatedAddress.deliveryAddressId);
      if (address) {
        DeliveryInfoUpdate(address, updatedAddress);
        if (address.isBaseAddress !== updatedAddress.isBaseAddress) {
          state = DeliveryInfoUpdateBaseAddress(
            state,
            address.deliveryAddressId,
            DeliveryType.delivery,
            updatedAddress.isBaseAddress
          );
        } else {
          state = { ...state, deliveryInfoList: state.deliveryInfoList }; // othervice change will not be updated by redux-persist
        }
      } else {
        debug('Delivery address is not in list', updatedAddress.deliveryAddressId);
      }

      return state;
    }

    case `${actionUpdateDeliveryPickupAddress.start}`: {
      const myAction = action as UpdateDeliveryPickupAddress;
      const updatedAddress = myAction.payload;

      const address = state.pickupInfoList.find((a) => a.deliveryAddressId === updatedAddress.deliveryAddressId);
      if (address) {
        if (address.isBaseAddress !== updatedAddress.isBaseAddress) {
          state = DeliveryInfoUpdateBaseAddress(
            state,
            address.deliveryAddressId,
            address.deliveryType,
            updatedAddress.isBaseAddress
          );
        }
      } else {
        debug('Delivery pickup address is not in list', updatedAddress.deliveryAddressId);
      }
      return state;
    }

    default:
      return state;
  }
};

/**
 * Reducer for fetch API operations
 */
const fetchReducer = (state: DeliveryState = new DeliveryState(), action: FetchActionTypes): DeliveryState => {
  switch (action.type) {
    case `${fetchDeliveryPickupPoints.done}`: {
      const myAction = action as FetchDeliveryPickupPointsDoneAction;
      const response = myAction.payload;

      if (!response || !response.pickupInfoList || response.pickupInfoList.length === 0) {
        debug('Empty delivery pickup points response', response);
        return state;
      }
      const newDeliveryInfoList: DeliveryInfo[] = [];
      for (const apiAddress of response.pickupInfoList) {
        const address = state.pickupInfoList.find((a) => a.deliveryAddressId === apiAddress.id);
        if (!address) {
          debug('Add pickup address into list', apiAddress, state.pickupInfoList);

          const deliveryInfo: DeliveryInfo = {
            deliveryAddressId: apiAddress.id,
            deliveryType: DeliveryType.pickup,
            clientName: apiAddress.storeName,
            phoneNumber: apiAddress.phoneNumber,
            address1: apiAddress.address1,
            address2: apiAddress.address2,
            note: apiAddress.note,
            isBaseAddress: false,
            lastUsedAt: new Date()
          };

          newDeliveryInfoList.push(deliveryInfo);
        } else if (address.deliveryType !== DeliveryType.pickup) {
          debug('Delivery address type collision, check logic', address, apiAddress);
          return state;
        } else {
          debug('Update pickup delivery address', address.deliveryAddressId);
          address.clientName = apiAddress.storeName;
          address.phoneNumber = apiAddress.phoneNumber;
          address.address1 = apiAddress.address1;
          address.address2 = apiAddress.address2;
          address.note = apiAddress.note;
          newDeliveryInfoList.push(address);
        }
      }
      // below also clenups old addresses which are not in api list
      return { ...state, pickupInfoList: newDeliveryInfoList };
    }

    case `${fetchDeliveryPickupPoints.fail}`: {
      const myAction = action as FetchDeliveryPickupPointsFailAction;
      debug('Problem with fetching delivery pickup points', myAction.payload);
      return state;
    }

    default:
      return state;
  }
};

export const deliveryStateBranchName = 'delivery';
nameofFactory<ApplicationState>()(deliveryStateBranchName); // name guard

export default {
  [deliveryStateBranchName]: dataReducer
};
