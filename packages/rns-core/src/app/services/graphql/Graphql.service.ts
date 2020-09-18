import { ApolloClientService } from './ApolloClient.service';

class GraphqlService {
  public client = ApolloClientService.GetApolloClient;

  // PRODUCT_QUERY =
}

const graphqlService = new GraphqlService();
export { graphqlService as GraphqlService };
