import { gql } from '@apollo/client';
import clonedeep from 'lodash.clonedeep';

import { debug as Debug } from '../debug';
import { PRODUCTS_FRAGMENT } from '../product';
import { GqlClientService } from '../shared';
import { CategoriesCollection, CategoryId, ProductCategoryCollection } from './types';

const debug = Debug('app:fetch:fetchCategoryWithProducts');

const CATEGORY_WITH_PRODUCT_FRAGMENT = gql`
  ${PRODUCTS_FRAGMENT}

  fragment CategoryFields on Category {
    id
    parentId
    title
    products {
      ...ProductFields
    }
  }
`;

const FETCH_CATEGORIES_WITH_PRODUCTS = gql`
  ${CATEGORY_WITH_PRODUCT_FRAGMENT}

  query CategoriesQuery($rootId: Int = 0, $withProducts: Boolean = true, $deep: Boolean = true) {
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

  const ss = clonedeep(result.data);
  debug('result.data', ss, result.data);
  return result.data?.categories;
};

const FETCH_ALL_CATEGORIES = gql`
  fragment CategoryFields on Category {
    id
    parentId
    title
  }

  query CategoriesQuery {
    allCategories {
      categories {
        ...CategoryFields
      }
    }
  }
`;

export const gqlFetchAllCategorisAsync = async (): Promise<CategoriesCollection> => {
  const result = await GqlClientService.apolloClient.query({
    query: FETCH_ALL_CATEGORIES
  });

  debug('result.data.categories', result.data);
  return result.data?.allCategories;
};
