import { createSelector } from 'reselect';

import { DeliveryAddressId, DeliveryInfo } from 'rns-types';
import { ApplicationState } from 'rns-packages/src/shared/types';
import { ParametrizedSelector, proxyParam } from 'rns-packages/src/shared';

const selectAddresses = (state: ApplicationState): DeliveryInfo[] => {
  return state.delivery.pickupInfoList.concat(state.delivery.deliveryInfoList);
};

const selectAddressesSorted = (state: ApplicationState): DeliveryInfo[] =>
  selectAddresses(state).sort((a, b) => {
    if (a.isBaseAddress && b.isBaseAddress) {
      return b.isBaseAddress || a.isBaseAddress ? 1 : -1;
    }

    if (a.lastUsedAt && b.lastUsedAt) {
      return b.lastUsedAt.getTime() - a.lastUsedAt.getTime();
    }

    return b.deliveryType - a.deliveryType;
  });

const selectAddressById = (): ParametrizedSelector<DeliveryAddressId, DeliveryInfo | undefined> =>
  createSelector(proxyParam, selectAddresses, (deliveryId: DeliveryAddressId, deliveryAddresses) =>
    deliveryAddresses.find((a) => a && a.deliveryAddressId === deliveryId)
  );

export const selectors = {
  selectAddressesSorted,
  selectAddressById
};
