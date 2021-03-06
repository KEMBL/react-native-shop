import { gql } from '@apollo/client';

import { CategoryId } from 'rns-types';

import { PRODUCTS_FRAGMENT } from '../product';
import { GqlClientService } from '../shared';
import { CategoriesCollection, ProductCategoryCollection } from './types';

const CATEGORY_WITH_PRODUCT_FRAGMENT = gql`
  ${PRODUCTS_FRAGMENT}

  fragment CategoryFieldsWithProduct on Category {
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
        ...CategoryFieldsWithProduct
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

  return result.data?.categories;
};

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    parentId
    title
  }
`;

const FETCH_ALL_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}

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

  return result.data?.allCategories;
};
