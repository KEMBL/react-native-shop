import { createSelector } from 'reselect';

import { DeliveryAddressId, DeliveryInfo } from 'rns-types';
import { ApplicationState } from 'rns-packages/src/shared/types';
import { ParametrizedSelector, proxyParam } from 'rns-packages/src/shared';

const selectAddresses = (state: ApplicationState): DeliveryInfo[] => {
  return state.delivery.pickupInfoList.concat(state.delivery.deliveryInfoList);
};

/**
 * Sorter by isBaseAddress DESC, lastUsedAt DESC, deliveryType DESC
 */
const addressSorter = (a: DeliveryInfo, b: DeliveryInfo): number => {
  if (a.isBaseAddress && b.isBaseAddress) {
    return b.isBaseAddress || a.isBaseAddress ? 1 : -1;
  }

  if (a.lastUsedAt && b.lastUsedAt) {
    return b.lastUsedAt.getDate() - a.lastUsedAt.getDate();
  }

  return b.deliveryType - a.deliveryType;
};

const selectAddressesSorted = (state: ApplicationState): DeliveryInfo[] => selectAddresses(state).sort(addressSorter);

const selectAddressById = (): ParametrizedSelector<DeliveryAddressId, DeliveryInfo | undefined> =>
  createSelector(proxyParam, selectAddresses, (deliveryId: DeliveryAddressId, deliveryAddresses) =>
    deliveryAddresses.find((a) => a && a.deliveryAddressId === deliveryId)
  );

/**
 * Address as we consider as base addres for delivery
 */
const selectBaseDeliveryAddress = (state: ApplicationState): DeliveryInfo | undefined => {
  const addresses = selectAddressesSorted(state);
  if (addresses.length > 0) {
    return addresses[0];
  }

  return undefined;
};

const selectDeliveryCost = (state: ApplicationState): number | undefined => {
  if (state.delivery.deliveryCostList.length === 0) {
    return undefined;
  }

  return state.delivery.deliveryCostList[0].cost;
};

export const selectors = {
  selectAddressesSorted,
  selectAddressById,
  selectBaseDeliveryAddress,
  selectDeliveryCost
};
