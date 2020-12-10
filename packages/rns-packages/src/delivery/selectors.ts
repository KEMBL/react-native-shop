import { DeliveryInfo } from 'rns-types';
import { ApplicationState } from 'rns-packages/src/shared/types';

const selectDeliveryAddresses = (state: ApplicationState): DeliveryInfo[] => state.delivery.deliveryInfoList;

export const selectors = {
  selectDeliveryAddresses
};
