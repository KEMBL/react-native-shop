/* eslint-disable @typescript-eslint/indent */
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import configuationService from '../ConfigurationService';

class ApolloClientService {
  public GetApolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: configuationService.baseApiURL,
    // Provide some optional constructor fields
    name: 'rns-gql-client',
    version: '1.0',
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        pollInterval: 60 * 1000 // The time interval (in milliseconds) on which this query should be refetched from the server.
      }
    }
  });
}

const apolloClientService = new ApolloClientService();
export { apolloClientService as ApolloClientService };
