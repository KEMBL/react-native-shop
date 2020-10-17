import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { GqlClientService } from 'rns-packages/src/shared';

export const setApolloClient = (client: ApolloClient<NormalizedCacheObject>): void => {
  GqlClientService.apolloClient = client;
};
