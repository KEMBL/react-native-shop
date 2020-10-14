import { gql } from '@apollo/client';

import { debug as Debug } from '../debug';
import { GqlClientService } from '../shared';
import { ProductsCollection } from './types';

const debug = Debug('app:fetch:fetchProducts');

export const PRODUCTS_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    categoryId
    editDatetime
    price {
      properties {
        propertyUnitType
        price
        property
      }
    }
  }
`;

const FETCH_ALL_PRODUCTS = gql`
  ${PRODUCTS_FRAGMENT}

  query ProductQuery {
    allProducts {
      products {
        ...ProductFields
      }
    }
  }
`;

export const gqlFetchAllProductsAsync = async (): Promise<ProductsCollection> => {
  const result = await GqlClientService.apolloClient.query({
    query: FETCH_ALL_PRODUCTS
  });

  debug('result.data.products', result.data);
  return result.data?.allProducts;
};
