import { gql } from '@apollo/client';

import { DeliveryInformationResponse } from 'rns-types';

import { GqlClientService } from '../shared';

const DELIVERY_PICKUP_FRAGMENT = gql`
  fragment DeliveryPickupInfoFields on DeliveryPickupInfo {
    id
    storeName
    phoneNumber
    address1
    address2
    note
  }
`;

const DELIVERY_COST_INFO_FRAGMENT = gql`
  fragment DeliveryCostInfoFields on DeliveryCostInfo {
    id
    distance
    cost
  }
`;

const FETCH_ALL_DELIVERY_PICKUP_POINTS = gql`
  ${DELIVERY_PICKUP_FRAGMENT}
  ${DELIVERY_COST_INFO_FRAGMENT}

  query DeliveryPickupPointsQuery {
    pickupInfoResponse {
      pickupInfoList {
        ...DeliveryPickupInfoFields
      }
      costInfoList {
        ...DeliveryCostInfoFields
      }
    }
  }
`;

export const gqlFetchDeliveryPickupPointsAsync = async (): Promise<DeliveryInformationResponse> => {
  const result = await GqlClientService.apolloClient.query({
    query: FETCH_ALL_DELIVERY_PICKUP_POINTS
  });

  return result.data?.pickupInfoResponse;
};
