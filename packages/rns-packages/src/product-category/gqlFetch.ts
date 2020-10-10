import { gql } from '@apollo/client';

import { debug as Debug } from '../debug';
import { GqlClientService } from '../shared';
import { CategoryId, ProductCategoryCollection } from './types';

const debug = Debug('app:fetch:fetchCategoryWithProducts');

const FETCH_CATEGORIES_WITH_PRODUCTS = gql`
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

  fragment CategoryFields on Category {
    id
    parentId
    title
    products {
      ...ProductFields
    }
  }

  query CategoriesQuery($rootId: Int = 0, $withProducts: Boolean = true, $deep: Boolean = false) {
    categories(rootId: $rootId, withProducts: $withProducts, deep: $deep) {
      categories {
        ...CategoryFields
      }
    }
  }
`;

export const gqlFetchCategoryWithProductsAsync = async (
  rootId: CategoryId,
  withProducts = false,
  deep = false
): Promise<ProductCategoryCollection> => {
  const result = await GqlClientService.apolloClient.query({
    query: FETCH_CATEGORIES_WITH_PRODUCTS,
    variables: { rootId, withProducts, deep }
  });

  // debug('result.data', !!result.data);
  return result.data?.categories;
};
