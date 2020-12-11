export type DeliveryAddressId = string;

export enum DeliveryType {
  /**
   * Client should take ordered items in store
   */
  pickup = 1,
  /**
   * Order will be shipped to the clinets address
   */
  delivery = 2
}

/**
 * Information about delivery address
 */
export interface DeliveryInfo {
  deliveryAddressId?: DeliveryAddressId;
  deliveryType?: DeliveryType;
  clientName: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  note: string;
  isBaseAddress: boolean;
  lastUsedAt?: Date;
}

/**
 * Information about pickup address
 */
export interface DeliveryPickupInfo {
  id?: DeliveryAddressId;
  storeName: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  note: string;
}

/**
 * Delivery pickup points API response
 */
export interface DeliveryPickupPointsCollectionResponse {
  pickupInfoList: DeliveryPickupInfo[];
}
