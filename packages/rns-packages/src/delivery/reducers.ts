import {
  DeliveryInfo,
  DeliveryInfoAdd,
  DeliveryInfoUpdate,
  DeliveryDefaultAddressUpdate,
  DeliveryInformationResponse,
  DeliveryType,
  DeliveryAddressId,
  DeliveryPickupInfo,
  DeliveryCost
} from 'rns-types';

import { ApplicationState, FailedActionResult } from 'rns-packages/src/shared/types';
import { nameofFactory, newUuid, debug as Debug } from 'rns-packages/src/shared';

import { DeliveryState } from './types';
import {
  actionAddDeliveryAddress,
  actionDeleteDeliveryAddresses,
  actionSetDefaultDeliveryAddress,
  actionUpdateDeliveryAddress,
  fetchDeliveryInformation
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
interface SetDeliveryDefaultAddress {
  type: string;
  payload: DeliveryDefaultAddressUpdate;
}

interface DeleteDeliveryAddresses {
  type: string;
  payload: DeliveryAddressId[];
}

interface FetchDeliveryInformationDoneAction {
  type: string;
  payload: DeliveryInformationResponse;
}

interface FetchDeliveryInformationFailAction {
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
  return { ...state, pickupInfoList: state.pickupInfoList, deliveryInfoList: state.deliveryInfoList };
};

type DeliveryActionTypes =
  | AddDeliveryAddress
  | UpdateDeliveryAddress
  | SetDeliveryDefaultAddress
  | DeleteDeliveryAddresses;
type FetchActionTypes = FetchDeliveryInformationDoneAction | FetchDeliveryInformationFailAction;

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
    case `${actionSetDefaultDeliveryAddress.start}`: {
      const myAction = action as SetDeliveryDefaultAddress;
      const addressInfo = myAction.payload;

      let address = state.deliveryInfoList.find((a) => a.deliveryAddressId === addressInfo.deliveryAddressId);
      if (!address) {
        address = state.pickupInfoList.find((a) => a.deliveryAddressId === addressInfo.deliveryAddressId);
      }

      if (!address) {
        debug('Delivery address to set as default is not in list', addressInfo.deliveryAddressId);
        return state;
      }

      if (!address.isBaseAddress) {
        state = DeliveryInfoUpdateBaseAddress(
          state,
          addressInfo.deliveryAddressId,
          address.deliveryType,
          addressInfo.isBaseAddress
        );
      }

      return state;
    }

    case `${actionDeleteDeliveryAddresses.start}`: {
      const myAction = action as DeleteDeliveryAddresses;
      const addressesToDel = myAction.payload;

      const leftAddress = state.deliveryInfoList.filter(
        (a) => !addressesToDel.some((da) => da === a.deliveryAddressId)
      );
      state = { ...state, deliveryInfoList: leftAddress }; // othervice change will not be updated by redux-persist

      return state;
    }

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

    default:
      return state;
  }
};

const updateDeliveryPickupPoints = (state: DeliveryState, pickupInfoList: DeliveryPickupInfo[]): DeliveryState => {
  if (!pickupInfoList || pickupInfoList.length === 0) {
    debug('Warning: Empty API delivery pickup points info', pickupInfoList);
    return state;
  }

  if (!state.pickupInfoList) {
    debug('Delivery pickup points info state branch will be initialized from API payload');
    return { ...state, pickupInfoList: [] };
  }

  const newDeliveryInfoList: DeliveryInfo[] = [];
  for (const apiAddress of pickupInfoList) {
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
};

const updateDeliveryCostInfo = (state: DeliveryState, deliveryCostList: DeliveryCost[]): DeliveryState => {
  if (!deliveryCostList || deliveryCostList.length === 0) {
    debug('Warning: Empty API delivery cost info', deliveryCostList);
    return state;
  }

  if (!state.deliveryCostList) {
    debug('Delivery cost info state branch was initialized from API payload');
    return { ...state, deliveryCostList };
  }

  const newDeliveryCostList: DeliveryCost[] = [];
  for (const apiCost of deliveryCostList) {
    const cost = state.deliveryCostList.find((c) => c.id === apiCost.id);
    if (!cost) {
      debug('Add a new cost information', apiCost, state.deliveryCostList);

      const newCostInfo: DeliveryCost = {
        id: apiCost.id,
        cost: apiCost.cost,
        distance: apiCost.distance
      };

      newDeliveryCostList.push(newCostInfo);
    } else {
      debug('Update cost information', cost.id);
      cost.cost = apiCost.cost;
      cost.distance = apiCost.distance;
      newDeliveryCostList.push(cost);
    }
  }
  // below also clenups old cost information  which are not in api list
  return { ...state, deliveryCostList: newDeliveryCostList };
};

/**
 * Reducer for fetch API operations
 */
const fetchReducer = (state: DeliveryState = new DeliveryState(), action: FetchActionTypes): DeliveryState => {
  switch (action.type) {
    case `${fetchDeliveryInformation.done}`: {
      const myAction = action as FetchDeliveryInformationDoneAction;
      if (!myAction?.payload) {
        debug('Uninitialized delivery pickup points response', myAction);
        return state;
      }

      const response = myAction.payload;
      state = updateDeliveryPickupPoints(state, response.pickupInfoList);
      state = updateDeliveryCostInfo(state, response.costInfoList);
      return state;
    }

    case `${fetchDeliveryInformation.fail}`: {
      const myAction = action as FetchDeliveryInformationFailAction;
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
