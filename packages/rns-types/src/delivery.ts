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
 * Information about delivery
 */
export interface DeliveryInfo {
  DeliveryInfoId: number;
  clientName: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  note: string;
}
