import { DeliveryInfo, DeliveryPickupPointsCollectionResponse, DeliveryType } from 'rns-types';

import { ApplicationState, FailedActionResult } from 'rns-packages/src/shared/types';
import { nameofFactory, newUuid, debug as Debug } from 'rns-packages/src/shared';

import { DeliveryState } from './types';
import { actionSaveDeliveryAddress, fetchDeliveryPickupPoints } from './actions';

const debug = Debug('app:reducer:delivery');

interface SaveDeliveryAddress {
  type: string;
  payload: DeliveryInfo;
}

export interface FetchDeliveryPickupPointsDoneAction {
  type: string;
  payload: DeliveryPickupPointsCollectionResponse;
}

export interface FetchDeliveryPickupPointsFailAction {
  type: string;
  payload: FailedActionResult;
}

type ActionTypes = SaveDeliveryAddress | FetchDeliveryPickupPointsDoneAction | FetchDeliveryPickupPointsFailAction;

const dataReducer = (state: DeliveryState = new DeliveryState(), action: ActionTypes): DeliveryState => {
  switch (action.type) {
    case `${actionSaveDeliveryAddress.start}`: {
      const myAction = action as SaveDeliveryAddress;
      const updatedAddress = myAction.payload;
      if (!updatedAddress.deliveryAddressId) {
        // add new delivery address
        updatedAddress.deliveryAddressId = newUuid();
        updatedAddress.deliveryType = DeliveryType.delivery;
        state.deliveryInfoList.push(updatedAddress);
      } else {
        // update exists address
        const address = state.deliveryInfoList.find((a) => a.deliveryAddressId === updatedAddress.deliveryAddressId);
        if (!address) {
          debug('Delivery address is not in list', updatedAddress);
        } else if (address.deliveryType === DeliveryType.pickup) {
          debug('Pickup delivery address cannot be updated', updatedAddress);
        } else {
          address.clientName = updatedAddress.clientName;
          address.phoneNumber = updatedAddress.phoneNumber;
          address.address1 = updatedAddress.address1;
          address.address2 = updatedAddress.address2;
          address.note = updatedAddress.note;
          address.isBaseAddress = updatedAddress.isBaseAddress;
          if (updatedAddress.isBaseAddress) {
            address.lastUsedAt = new Date();
          }
        }
      }
      return state;
    }

    case `${fetchDeliveryPickupPoints.done}`: {
      const myAction = action as FetchDeliveryPickupPointsDoneAction;
      const response = myAction.payload;

      if (!response || !response.pickupInfoList || response.pickupInfoList.length === 0) {
        debug('Empty delivery pickup points response', response);
        return state;
      }
      debug('state', state);
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
            note: apiAddress.note
          };

          newDeliveryInfoList.push(deliveryInfo);
        } else if (address.deliveryType !== DeliveryType.pickup) {
          debug('Delivery address collision, check logic', address, apiAddress);
        } else {
          debug('Update delivery address', address, apiAddress);
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
