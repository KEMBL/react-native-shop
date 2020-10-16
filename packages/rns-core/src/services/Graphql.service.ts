import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ConfiguationService } from './Configuration.service';

class GraphqlService {
  private _client!: ApolloClient<NormalizedCacheObject>;

  public get apolloClient(): ApolloClient<NormalizedCacheObject> {
    if (this._client) {
      return this._client;
    }
    this._client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: ConfiguationService.baseApiURL,
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

    return this._client;
  }
}

const graphqlService = new GraphqlService();
export { graphqlService as GraphqlService };
