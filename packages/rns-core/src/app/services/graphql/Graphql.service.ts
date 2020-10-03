import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { ApolloClientService } from './ApolloClient.service';

class GraphqlService {
  private client = ApolloClientService.GetApolloClient;

  get apolloClient(): ApolloClient<NormalizedCacheObject> {
    return this.client;
  }
}

const graphqlService = new GraphqlService();
export { graphqlService as GraphqlService };
