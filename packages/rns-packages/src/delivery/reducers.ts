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

      debug('TODO: Update current state', response);
      return state;
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
