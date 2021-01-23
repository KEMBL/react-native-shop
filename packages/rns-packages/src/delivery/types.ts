import { DeliveryCost, DeliveryInfo } from 'rns-types';

export class DeliveryState {
  /**
   * Self pickup points added by store
   */
  pickupInfoList: DeliveryInfo[] = [];
  /**
   * Delivery points added by user
   */
  deliveryInfoList: DeliveryInfo[] = [];
  /**
   * Delivery cost information
   */
  deliveryCostList: DeliveryCost[] = [];
}
