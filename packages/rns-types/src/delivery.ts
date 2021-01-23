export type DeliveryAddressId = string;
export type DeliveryCostId = string;

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

export interface DeliveryInfoAdd {
  clientName: string;
  phoneNumber: string;
  address1: string;
  address2?: string;
  note?: string;
  isBaseAddress: boolean;
}

export interface DeliveryInfoUpdate extends DeliveryInfoAdd {
  deliveryAddressId: DeliveryAddressId;
}

export interface DeliveryDefaultAddressUpdate {
  deliveryAddressId: DeliveryAddressId;
  isBaseAddress: boolean;
}

/**
 * Full information about delivery address in store
 */
export interface DeliveryInfo extends DeliveryInfoAdd, DeliveryInfoUpdate {
  deliveryType: DeliveryType;
  lastUsedAt: Date;
}

/**
 * Information about pickup address came from API
 */
export interface DeliveryPickupInfo {
  id: DeliveryAddressId;
  storeName: string;
  phoneNumber: string;
  address1: string;
  address2?: string;
  note?: string;
}

/**
 * Information about delivery cost
 */
export interface DeliveryCost {
  id: DeliveryCostId;
  distance: number;
  cost: number;
}

/**
 * Delivery pickup points API response
 */
export interface DeliveryInformationResponse {
  pickupInfoList: DeliveryPickupInfo[];
  costInfoList: DeliveryCost[];
}
