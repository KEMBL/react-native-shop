import { gql } from '@apollo/client';

import { DeliveryPickupPointsCollectionResponse } from 'rns-types';

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

const FETCH_ALL_DELIVERY_PICKUP_POINTS = gql`
  ${DELIVERY_PICKUP_FRAGMENT}

  query DeliveryPickupPointsQuery {
    pickupInfoResponse {
      pickupInfoList {
        ...DeliveryPickupInfoFields
      }
    }
  }
`;

export const gqlFetchDeliveryPickupPointsAsync = async (): Promise<DeliveryPickupPointsCollectionResponse> => {
  const result = await GqlClientService.apolloClient.query({
    query: FETCH_ALL_DELIVERY_PICKUP_POINTS
  });

  return result.data;
};
