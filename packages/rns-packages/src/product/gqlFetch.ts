import { gql } from '@apollo/client';
import { ProductsCollection } from 'rns-types';

import { GqlClientService } from 'rns-packages/src/shared';

export const PRODUCTS_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    categoryId
    editDatetime
    imageUrls
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

  return result.data?.allProducts;
};
