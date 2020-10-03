import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

/**
 * Build redux store
 */
class GqlClientService {
  private client!: ApolloClient<NormalizedCacheObject>;

  get apolloClient(): ApolloClient<NormalizedCacheObject> {
    return this.client;
  }

  set apolloClient(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }
}

const gqlClientService = new GqlClientService();
export { gqlClientService as GqlClientService };
